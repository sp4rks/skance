import { Hono } from "jsr:@hono/hono";

import { z } from "zod";

type Variables = {
  outputSchema: z.ZodSchema;
};

export const root = new Hono<{ Variables: Variables }>();

root.get("/", (c) => {
  const response = {
    message: "Admin API",
    timestamp: new Date().toISOString()
  };
  return c.json(response, 200);
});