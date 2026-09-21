// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("description-must-not-be-blank", async ({
    loginPage,
    boardPage,
    createBugModal,
    bugsApi,
  }) => {
    const title = `Blank description ${crypto.randomUUID()}`;

    // 1. Open the create-bug modal, fill title, leave description blank
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillTitle(title);

    // 2. Attempt to save
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText("Description is required.");
    expect(await bugsApi.findByTitle(title)).toBeUndefined();
  });
});
