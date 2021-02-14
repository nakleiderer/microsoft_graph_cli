import { Command, csv, ITypeInfo, Table } from "../../deps.ts";
import { ValidationError } from "../errors/ValidationError.ts";
import { AnyFunction } from "./AnyFunction.ts";
import { NewParams } from "./NewParams.ts";

interface HandleFormattingOptions {
  format: Format;
}

export const handleFormatting = <Func extends AnyFunction>(
  fn: Func,
): ((...args: NewParams<Func, HandleFormattingOptions>) => Promise<string>) => {
  const wrappedFn = async (
    ...args: NewParams<Func, HandleFormattingOptions>
  ): Promise<string> => {
    const [options, ...restArgs] = args;
    const { format, ...restOpts } = options;
    const newArgs = [restOpts, ...restArgs];
    const result = [await fn(...newArgs)].flat(1);
    const safeFirstResult = result?.[0] ?? {};

    let value: string;
    switch (format as Format) {
      case "csv":
        value = await csv.stringify(
          result,
          Object.keys(safeFirstResult),
        );
        break;
      case "json":
        value = JSON.stringify(result);
        break;
      case "table":
        value = new Table()
          .header(Object.keys(safeFirstResult))
          .body(
            result.map((r) => Object.values(r).map((x) => JSON.stringify(x))),
          )
          .border(true)
          .toString();
        break;
    }

    return value;
  };

  return wrappedFn;
};

const formats = ["json", "csv", "table"] as const;
export type Format = typeof formats[number];

function formatType({ value }: ITypeInfo) {
  const isValid = formats.includes(value as Format);

  if (!isValid) {
    throw new ValidationError(`"${value}" is not a valid format`);
  }

  return value;
}

export function formattableCommand(cmd: Command) {
  return cmd
    .type("format", formatType)
    .complete("format", () => Array.from(formats))
    .option(
      "-f --format <format:format:format>",
      "The format to output the users",
      { default: "table" },
    );
}
