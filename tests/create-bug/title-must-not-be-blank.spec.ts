import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Validation", () => {
  test("title-must-not-be-blank", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Leave the Title field blank and fill in a description
    await createBugModal.fillDescription("This bug has no title.");

    // Act
    // 3. Click Save
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeVisible();
    await expect(createBugModal.errorList).toContainText("Title is required.");
  });
});
