import bcrypt from "bcrypt";
import { createCookieSessionStorage, redirect, Session } from "@remix-run/node";

import { db } from "./db.server";
import { User } from "@prisma/client";

type LoginForm = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginForm) {
  const user = await db.user.findUnique({
    where: { username },
  });
  if (!user) {
    return null;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  console.log("Password is correct: ", isCorrectPassword);
  if (!isCorrectPassword) {
    return null;
  }

  return { id: user.id, username };
}

export async function logout(request: Request) {
  const session = await getUserSession(request);
  return redirect("/jokes", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "RJ_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getUserSession(request: Request): Promise<Session> {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (typeof userId !== "string") {
    return null;
  }
  return userId;
}

export async function getUser(
  request: Request
): Promise<Pick<User, "id" | "username"> | null> {
  let userId = await getUserId(request);
  if (!userId) {
    return null;
  }
  return db.user.findUnique({
    select: { id: true, username: true },
    where: { id: userId },
  });
}
