import { test } from "./fixtures";
import users from "../users.json" with { type: "json" };

const seedUser = users[0];
if (!seedUser) {
  throw new Error("users.json must contain at least one user");
}

test("seed", async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login(seedUser.username, seedUser.password);
});
