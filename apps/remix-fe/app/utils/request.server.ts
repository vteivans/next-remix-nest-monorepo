import { json } from "@remix-run/node";

/**
 * This helper function helps us returning the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export function badRequest<T>(data: T) {
  return json<T>(data, { status: 400 });
}
