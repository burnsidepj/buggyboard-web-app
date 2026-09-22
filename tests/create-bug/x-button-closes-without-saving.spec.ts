import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Opening and closing the modal", () => {
  test("x-button-closes-without-saving", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Discarded by X button");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type a title into the Title field
    await createBugModal.fillTitle(title);

    // Act
    // 3. Click the X button in the upper right corner of the dialog
    await createBugModal.close();

    // Assert
    await expect(createBugModal.modal).toBeHidden();
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(0);
  });
});
