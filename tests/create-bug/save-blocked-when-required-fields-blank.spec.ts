// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("save-blocked-when-required-fields-blank", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // 1. Open the create-bug modal
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillOwner("");

    // 2. Attempt to save with title, owner, and description blank
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText("Title is required.");
    await expect(createBugModal.validationAlert).toContainText("Owner is required.");
    await expect(createBugModal.validationAlert).toContainText("Description is required.");
  });
});
