import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { JokeDisplay } from "~/components/joke";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { requireUserId } from "~/utils/session.server";

function validateJokeContent(content: string) {
  if (content.length < 10) {
    return `That joke is too short`;
  }
}

function validateJokeName(name: string) {
  if (name.length < 3) {
    return `That joke's name is too short`;
  }
}

export const action = async ({ request }: ActionArgs) => {
  console.log("Request method", request.method);

  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");
  // we do this type check to be extra sure and to make TypeScript happy
  // we'll explore validation next!
  if (typeof name !== "string" || typeof content !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };
  const fields = { name, content, jokesterId: userId };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const joke = await db.joke.create({ data: fields });
  // const joke = { id: 1 };
  return redirect(`/jokes/${joke.id}`);
};

export default function NewJoke() {
  const actionData = useActionData<typeof action>();
  const submission = useNavigation(); // Why use this instead of transition?
  // According to Remix docs, this will be removed in V2 in favor or useNavigation
  // const { submission } = useTransition(); // What's the difference?

  if (submission) {
    const jokeName = submission.formData?.get("name");
    const jokeContent = submission.formData?.get("content");

    if (
      typeof jokeName === "string" &&
      typeof jokeContent === "string" &&
      validateJokeName(jokeName) &&
      validateJokeContent(jokeContent)
    ) {
      return (
        <JokeDisplay
          joke={{
            name: jokeName,
            content: jokeContent,
          }}
          isOwner={false}
        />
      );
    }
  }

  return (
    <div>
      <p>Add your own hilariouse joke</p>
      <Form method="post">
        <div>
          <label>
            Name:{" "}
            <input
              type="text"
              defaultValue={actionData?.fields?.name}
              name="name"
              aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
              aria-errormessage={
                actionData?.fieldErrors?.name ? "name-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p className="form-validation-error" role="alert" id="name-error">
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content:{" "}
            <textarea
              defaultValue={actionData?.fields?.content}
              name="content"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.content ? "content-error" : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          {actionData?.formError ? (
            <p className="form-validation-error" role="alert">
              {actionData.fieldErrors}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={Boolean(submission)}
            className="button"
          >
            {submission ? "Adding..." : "Add"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
