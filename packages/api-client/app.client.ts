import { appGetHelloModel, AppHelloResponse } from "./app.model";

export async function appGetHello(baseUrl: URL): Promise<AppHelloResponse> {
  const route = "";
  const resquestUrl = new URL(baseUrl);
  resquestUrl.pathname += route;

  const response = await fetch(resquestUrl).then((res) => res.json());
  return appGetHelloModel.parse(response);
}
