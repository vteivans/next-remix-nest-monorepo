import { Joke } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

export function JokeDisplay({
  joke,
  isOwner,
}: {
  joke: Pick<Joke, "content" | "name">;
  isOwner: boolean;
}) {
  return (
    <div>
      <p>Here&apos;s your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to=".">{joke.name} Permalink</Link>
      {isOwner ? (
        <Form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="button">
            Delete
          </button>
        </Form>
      ) : null}
    </div>
  );
}
