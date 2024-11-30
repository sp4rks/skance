import { assertEquals, assert } from "jsr:@std/assert";

const tick = "\x1b[32m✓\x1b[0m";
const cross = "\x1b[31m✗\x1b[0m";

export const statusCode = (response: Response, expectedStatus: number) => {
  try {
    assertEquals(response.status, expectedStatus);
    console.log(`${tick} Response code: ${expectedStatus}`);
  } catch (error) {
    console.log(`${cross} Expected ${expectedStatus} response code, but got ${response.status}`);
    throw error;
  }
};

export const message = (payload: { message: string }, expectedMessage: string) => {
  try {
    assertEquals(payload.message, expectedMessage);
    console.log(`${tick} message is '${expectedMessage}'`);
  } catch (error) {
    console.log(`${cross} Expected message to be '${expectedMessage}' but got: ${payload.message}`);
    throw error;
  }
};

export const timestamp = (timestamp: string) => {
  try {
    assert(new Date(timestamp).toISOString() === timestamp);
    console.log(`${tick} timestamp is ISO string`);
  } catch (error) {
    console.log(`${cross} Expected timestamp to be ISO string but got: ${timestamp}`);
    throw error;
  }
};

export const object = (response: object) => {
  try {
    assert(typeof response === 'object' && response !== null);
    console.log(`${tick} response is an object`);
  } catch (error) {
    console.log(`${cross} Expected payload to be an object but got: ${typeof response}`);
    throw error;
  }
};
