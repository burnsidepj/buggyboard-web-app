// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("cancel-without-saving", async ({ loginPage, boardPage, createBugModal, bugsApi }) => {
    const title = `Cancel create ${crypto.randomUUID()}`;

    // 1. Open the create-bug modal and enter data in the fields
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillTitle(title);
    await createBugModal.fillDescription("Should not be saved.");

    // 2. Click Cancel
    await createBugModal.cancel();

    await expect(createBugModal.dialog).toBeHidden();
    expect(await bugsApi.findByTitle(title)).toBeUndefined();
  });
});
