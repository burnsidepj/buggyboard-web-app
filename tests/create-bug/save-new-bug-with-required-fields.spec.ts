// spec: specs/create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Create bug", () => {
  test("save-new-bug-with-required-fields", async ({
    loginPage,
    boardPage,
    createBugModal,
    bugsApi,
  }) => {
    const title = `Login fails with special characters ${crypto.randomUUID()}`;
    const description = "When I use < and > in my password, login fails.";

    // 1. Open the create-bug modal and enter a unique title, HIGH severity, and a description
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);
    await boardPage.openCreateBugModal();
    await createBugModal.fillTitle(title);
    await createBugModal.selectSeverity("HIGH");
    await createBugModal.fillDescription(description);

    // 2. Click Save
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeHidden();
    const bug = await bugsApi.findByTitle(title);
    expect(bug).toEqual(
      expect.objectContaining({
        title,
        severity: "HIGH",
        owner: seedUser.username,
        description,
      }),
    );
  });
});
