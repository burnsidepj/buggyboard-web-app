// spec: specs/features/14-bug-creator.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Bug creator", () => {
  test("created-with-current-user", async ({ loginPage, boardPage, createBugModal, bugsApi }) => {
    const title = `Creator is current user ${crypto.randomUUID()}`;

    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillTitle(title);
    await createBugModal.selectSeverity("HIGH");
    await createBugModal.fillDescription("Creator should be the logged-in user.");

    await createBugModal.save();

    await expect(createBugModal.dialog).toBeHidden();
    const bug = await bugsApi.findByTitle(title);
    expect(bug?.creator).toBe(seedUser.username);
  });
});
