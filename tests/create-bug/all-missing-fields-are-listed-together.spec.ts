import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Validation", () => {
  test("all-missing-fields-are-listed-together", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // Act
    // 2. Click Save without entering anything
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeVisible();
    await expect(createBugModal.errorList).toContainText("Title is required.");
    await expect(createBugModal.errorList).toContainText(
      "Description is required."
    );
  });
});
