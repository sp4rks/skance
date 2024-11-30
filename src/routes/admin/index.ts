import { Hono } from "jsr:@hono/hono";

import { z } from "zod";

type Variables = {
  outputSchema: z.ZodSchema;
};

export const root = new Hono<{ Variables: Variables }>();

const rootOutputSchema = z.object({
  message: z.string(),
  timestamp: z.string()
});

root.get("/", (c) => {
  c.set("outputSchema", rootOutputSchema);
  const response = {
    message: "Admin API",
    timestamp: new Date().toISOString()
  };
  const validated = rootOutputSchema.parse(response);
  return c.json(validated, 200);
});
