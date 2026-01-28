export function stringifyWithRegex(obj: unknown): string {
  return JSON.stringify(
    obj,
    (_key, value) => {
      if (value instanceof RegExp) {
        return {
          type: "RegExp",
          pattern: value.source,
          flags: value.flags,
        };
      }
      return value;
    },
    2,
  );
}
