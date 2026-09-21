// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("title-must-not-be-blank", async ({ loginPage, boardPage, createBugModal, bugsApi }) => {
    const description = `Blank title ${crypto.randomUUID()}`;

    // 1. Open the create-bug modal, leave title blank, fill owner and description
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillDescription(description);

    // 2. Attempt to save
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText("Title is required.");
    const bugs = await bugsApi.listBugs();
    expect(bugs.some((bug) => bug.description === description)).toBe(false);
  });
});
