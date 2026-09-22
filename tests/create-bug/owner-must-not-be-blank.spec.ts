import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Validation", () => {
  test("owner-must-not-be-blank", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Missing owner");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2-3. Fill in a title and description, then clear the pre-filled Owner field
    await createBugModal.fillForm({
      title,
      description: "Owner was cleared.",
      owner: "",
    });

    // Act
    // 4. Click Save
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeVisible();
    await expect(createBugModal.errorList).toContainText("Owner is required.");
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(0);
  });
});
