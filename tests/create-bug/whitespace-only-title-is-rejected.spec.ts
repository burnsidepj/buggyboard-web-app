import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Validation", () => {
  test("whitespace-only-title-is-rejected", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2-3. Type only spaces into the Title field and fill in a description
    await createBugModal.fillForm({
      title: "   ",
      description: "Title is only whitespace.",
    });

    // Act
    // 4. Click Save
    await createBugModal.save();

    // Assert
    // Titles are trimmed before validation, so whitespace counts as blank.
    await expect(createBugModal.modal).toBeVisible();
    await expect(createBugModal.errorList).toContainText("Title is required.");
  });
});
