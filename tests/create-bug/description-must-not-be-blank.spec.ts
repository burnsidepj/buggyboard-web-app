import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Validation", () => {
  test("description-must-not-be-blank", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Missing description");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Fill in a title and leave the Description field blank
    await createBugModal.fillTitle(title);

    // Act
    // 3. Click Save
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeVisible();
    await expect(createBugModal.errorList).toContainText(
      "Description is required."
    );
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(0);
  });
});
