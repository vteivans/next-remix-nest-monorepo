import bcrypt from "bcrypt";

import { db } from "./db.server";

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
