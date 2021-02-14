import { Command, ensureFile } from "../../deps.ts";
import { AnyFunction } from "./AnyFunction.ts";
import { NewParams } from "./NewParams.ts";

interface HandleOutputOptions {
  out?: string;
}

export const handleOutput = <Func extends AnyFunction>(
  fn: Func,
): ((...args: NewParams<Func, HandleOutputOptions>) => Promise<void>) => {
  const wrappedFn = async (
    ...args: NewParams<Func, HandleOutputOptions>
  ): Promise<void> => {
    const [options, ...restArgs] = args;
    const { out, ...restOpts } = options;
    const newArgs = [restOpts, ...restArgs];
    const result = await fn(...newArgs);

    if (out) {
      await ensureFile(out);
      await Deno.writeTextFile(
        out,
        result,
      );
    } else {
      Deno.stdout.writeSync(new TextEncoder().encode(result + "\n"));
    }
  };

  return wrappedFn;
};

export function outputableCommand(cmd: Command) {
  return cmd
    .option(
      "-o --out <out:string>",
      "The location to save the result",
    );
}
