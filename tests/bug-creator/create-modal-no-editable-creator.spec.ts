// spec: specs/features/14-bug-creator.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Bug creator", () => {
  test("create-modal-no-editable-creator", async ({ loginPage, boardPage, createBugModal }) => {
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);

    await boardPage.openCreateBugModal();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.creatorInput).toHaveCount(0);
  });
});
