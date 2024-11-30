import { load } from "jsr:@std/dotenv";
import { cyan, green, red } from "jsr:@std/fmt/colors";

import defaults from '@skance/config/defaults.ts';

export const config: { [key: string]: string } = {};

await load({ 
  export: true,
  envPath: "./.env"
});
console.log("Environment variables loaded.");

for (const envVar of Object.keys(defaults)) {
  const defaultPair = defaults[envVar as keyof typeof defaults];
  const environmentValue = Deno.env.get(envVar);

  if (environmentValue) {
    config[defaultPair.name] = environmentValue;
    console.log(`${cyan(envVar)}: ${defaultPair.name}=${environmentValue} from ${green('environment')}`);
  } else {
    config[defaultPair.name] = String(defaultPair.value);
    console.log(`${cyan(envVar)}: ${defaultPair.name}=${defaultPair.value} from ${red('defaults')}`);
  }
}

console.log('Configuration loaded.');