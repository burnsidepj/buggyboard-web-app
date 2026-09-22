import { randomUUID } from "node:crypto";

/**
 * Credentials from `users.json` at the repo root. Override with environment variables to run
 * the suite as a different user.
 */
export const USERNAME = process.env.BUGGYBOARD_USER ?? "paul";
export const PASSWORD = process.env.BUGGYBOARD_PASSWORD ?? "1965ghia";

/**
 * The SQLite database is never reset between runs, so every test that creates or looks up a bug
 * needs a title no other run could have produced.
 */
export function uniqueTitle(label: string): string {
  return `${label} ${randomUUID()}`;
}
