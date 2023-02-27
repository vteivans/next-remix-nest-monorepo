import { json, LoaderArgs, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  // TODO: typesecure the params
  console.log(params);
  const joke = await db.joke.findUnique({
    where: { id: params.jokeId },
  });
  if (!joke) {
    throw new Error("Joke not found");
  }
  return json({ joke });
};

export default function Route() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Here&apos;s your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}
