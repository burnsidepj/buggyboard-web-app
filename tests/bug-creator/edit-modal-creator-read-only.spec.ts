// spec: specs/features/14-bug-creator.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Bug creator", () => {
  test("edit-modal-creator-read-only", async ({
    loginPage,
    boardPage,
    editBugModal,
    bugsApi,
  }) => {
    const title = `Edit shows creator ${crypto.randomUUID()}`;
    await bugsApi.createBug({
      title,
      severity: "MID",
      owner: "vanny",
      creator: seedUser.username,
      description: "Seeded so Creator can be shown read-only.",
    });

    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openBugByTitle(title);

    await expect(editBugModal.dialog).toBeVisible();
    await expect(editBugModal.creatorInput).toHaveValue(seedUser.username);
    await expect(editBugModal.creatorInput).toHaveAttribute("readonly", "");
  });
});
