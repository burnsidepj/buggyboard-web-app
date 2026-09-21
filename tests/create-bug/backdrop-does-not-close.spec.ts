// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("backdrop-does-not-close", async ({ loginPage, boardPage, createBugModal }) => {
    const title = `Keep this title ${crypto.randomUUID()}`;
    const description = "Preserved after backdrop click.";

    // 1. Open the create-bug modal and enter data in the fields
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillTitle(title);
    await createBugModal.fillDescription(description);

    // 2. Click the dimmed backdrop outside the modal panel
    await createBugModal.clickBackdrop();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.titleInput).toHaveValue(title);
    await expect(createBugModal.descriptionInput).toHaveValue(description);
  });
});
