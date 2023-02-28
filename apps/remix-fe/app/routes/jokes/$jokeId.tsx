import { Joke } from "@prisma/client";
import {
  ActionArgs,
  json,
  LoaderArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { JokeDisplay } from "~/components/joke";
import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/session.server";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: "No joke",
      description: "No joke found",
    };
  }
  return {
    title: `"${data.joke.name}" joke`,
    description: `Enjoy the "${data.joke.name}" joke and much more`,
  };
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(`The intent ${form.get("_method")} is not supported`, {
      status: 400,
    });
  }
  const userId = await requireUserId(request);
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  if (joke.jokesterId !== userId) {
    throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
  }
  await db.joke.delete({ where: { id: params.jokeId } });
  return redirect("/jokes");
};

type LoaderData = {
  isOwner: boolean;
  joke: Joke;
};

export const loader = async ({ params, request }: LoaderArgs) => {
  // TODO: typesecure the params
  console.log(params);
  const userId = await getUserId(request);
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Response("Joke not found", { status: 404 });
  }

  return json<LoaderData>({
    joke,
    isOwner: Boolean(userId && joke.jokesterId === userId),
  });
};

export default function Route() {
  const data = useLoaderData<typeof loader>();

  return <JokeDisplay joke={data.joke} isOwner={data.isOwner} />;
}

export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}
