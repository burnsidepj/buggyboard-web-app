import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Validation", () => {
  test("validation-clears-after-fixing-the-field", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Fixed after validation");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Click Save without entering anything
    await createBugModal.save();
    await expect(createBugModal.errorList).toContainText("Title is required.");

    // Act
    // 3-4. Fill in the required fields and save again
    await createBugModal.fillForm({
      title,
      description: "All required fields now filled.",
    });
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeHidden();
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(1);
  });
});
