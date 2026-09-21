// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("default-owner-to-current-user", async ({ loginPage, boardPage, createBugModal }) => {
    // 1. Open the create-bug modal from the board page
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();

    await expect(createBugModal.ownerInput).toHaveValue(seedUser.username);
  });
});
