import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Opening and closing the modal", () => {
  test("cancel-closes-without-saving", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Discarded by Cancel");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type a title into the Title field
    await createBugModal.fillTitle(title);

    // Act
    // 3. Click Cancel
    await createBugModal.cancel();

    // Assert
    await expect(createBugModal.modal).toBeHidden();
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(0);
  });
});
