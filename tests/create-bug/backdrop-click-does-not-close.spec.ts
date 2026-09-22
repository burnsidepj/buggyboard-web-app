import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Opening and closing the modal", () => {
  test("backdrop-click-does-not-close", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Backdrop probe");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type a title into the Title field
    await createBugModal.fillTitle(title);

    // Act
    // 3. Click the dimmed area outside the dialog
    await createBugModal.clickBackdrop();

    // Assert
    await expect(createBugModal.modal).toBeVisible();
    await expect(createBugModal.titleInput).toHaveValue(title);
  });
});
