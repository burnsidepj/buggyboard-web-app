// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("owner-must-not-be-blank", async ({ loginPage, boardPage, createBugModal, bugsApi }) => {
    const title = `Blank owner ${crypto.randomUUID()}`;

    // 1. Open the create-bug modal, fill title and description, clear owner
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillTitle(title);
    await createBugModal.fillOwner("");
    await createBugModal.fillDescription("Owner should be required.");

    // 2. Attempt to save
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText("Owner is required.");
    expect(await bugsApi.findByTitle(title)).toBeUndefined();
  });
});
