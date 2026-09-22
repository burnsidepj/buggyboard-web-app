import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Saving a bug", () => {
  test("owner-can-be-changed-before-saving", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Reassigned on creation");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2-3. Replace the owner and fill in the remaining fields
    await createBugModal.fillForm({
      title,
      owner: "vanny",
      description: "Created by one user but owned by another.",
    });

    // Act
    // 4. Click Save
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeHidden();
    const row = boardPage.bugRows.filter({ hasText: title });
    await expect(row.getByTestId("bug-cell-owner")).toHaveText("vanny");
  });
});
