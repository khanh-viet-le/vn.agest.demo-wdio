import allure from "@wdio/allure-reporter";

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

export async function reportTestData(obj: unknown) {
  await allure.addAttachment(
    "Test Data",
    stringifyWithRegex(obj),
    "application/json",
  );
}
