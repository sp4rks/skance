import { Context } from "jsr:@hono/hono";
import { config } from "@skance/config/config.ts";

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour12: false,
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
});

export const httpLog = async (c: Context, next: () => Promise<void>) => { // Add type annotation for 'next'
  const start = performance.now();

  // Log the request
  console.log(
    '<--',
    c.env?.remoteAddr ? ((c.env.remoteAddr as Deno.NetAddr)?.hostname ?? '-') : '-',
    '-', //user
    `[${timeFormatter.format(new Date())}]`,
    c.req.method,
    c.req.path
  );

  await next();

  // Log the response
  console.log(
    '-->',
    c.env?.remoteAddr ? ((c.env.remoteAddr as Deno.NetAddr)?.hostname ?? '-') : '-',
    '-', //user
    `[${timeFormatter.format(new Date())}]`,
    c.req.method,
    c.req.path,
    c.res.status,
    (performance.now() - start).toPrecision(2),
    'ms'
  );
};

export const appLog = {
  debug: (message: string) => {
    if (config.logLevel === 'debug') {
      console.log(`DEBUG: ${message}`);
    }
  },
  info: (message: string) => {
    if (['debug', 'info'].includes(config.logLevel)) {
      console.log(`INFO: ${message}`);
    }
  },
  warn: (message: string) => {
    if (['debug', 'info', 'warn'].includes(config.logLevel)) {
      console.warn(`WARN: ${message}`);
    }
  },
  error: (message: string) => {
    // Error logs should always be shown regardless of log level
    console.error(`ERROR: ${message}`);
  }
};