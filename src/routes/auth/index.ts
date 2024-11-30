import { Hono } from "jsr:@hono/hono";

export const root = new Hono();

root.get("/", (c) => {
  return c.json({
    message: "AuthN API",
    timestamp: new Date().toISOString()
  });
});
