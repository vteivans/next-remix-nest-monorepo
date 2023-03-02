import { AppHelloResponse } from "./app.types";

export async function appGetHello(baseUrl: URL): Promise<AppHelloResponse> {
  const route = "";
  const resquestUrl = new URL(baseUrl);
  resquestUrl.pathname += route;

  return fetch(resquestUrl).then((res) => res.json());
}
