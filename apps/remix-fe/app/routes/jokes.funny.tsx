import { useLoaderData } from "@remix-run/react";
import { appGetHello } from "api-client";

// appGetHello;

export const loader = async () => {
  // TODO: The URL comes from ENV
  return appGetHello(new URL("http://localhost:3003"));
};

/*
This will go under /jokes/funny
Even though it is not a child route of `jokes`.
It helps in cases when you don't want to apply the parent route layout.


*/
export default function JokesFunny() {
  const greeting = useLoaderData<typeof loader>();
  console.log({ greeting });
  return <p>{greeting.data}</p>;
}
