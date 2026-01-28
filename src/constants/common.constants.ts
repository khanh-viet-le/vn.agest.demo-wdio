import { config } from "@config";

const BASE_URL = config.baseUrl ?? "";

export const Route = {
  HOME: BASE_URL,
  SHOP: BASE_URL + "/shop",
};
