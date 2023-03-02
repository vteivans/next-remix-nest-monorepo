import { z } from "zod";

export const appGetHelloModel = z.object({
  data: z.string(),
});

export type AppHelloResponse = z.infer<typeof appGetHelloModel>;
