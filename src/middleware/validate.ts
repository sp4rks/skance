import { Context, MiddlewareHandler } from "jsr:@hono/hono";
import { z } from "zod";

export const validateInput = (schema: z.ZodType): MiddlewareHandler => {
  return async (c: Context, next) => {
    try {
      const body = await c.req.json();
      const validated = schema.parse(body);
      c.set('validated', validated);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ error: error.errors }, 400);
      }
      return c.json({ error: "Invalid request" }, 400);
    }
  };
};

export const validateOutput = <T extends z.ZodType>(schema: T): MiddlewareHandler => {
  return async (c: Context, next) => {
    // Store the original json function
    const originalJson = c.json.bind(c);
    
    // Override the json function
    // deno-lint-ignore no-explicit-any
    c.json = (data: any, status?: any, headers?: any) => {
      try {
        // Validate the output data
        const validated = schema.parse(data);
        return originalJson(validated, status, headers);
      } catch (error) {
        // Log the error (this shouldn't normally happen in production)
        console.error('Output validation failed:', error);
        return originalJson({ error: "Internal Server Error" }, 500);
      }
    };
    
    await next();
  };
};