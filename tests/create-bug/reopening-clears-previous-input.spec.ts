import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Opening and closing the modal", () => {
  test("reopening-clears-previous-input", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Abandoned draft");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type a title into the Title field
    await createBugModal.fillTitle(title);

    // 3. Press the Escape key
    await createBugModal.pressEscape();
    await expect(createBugModal.modal).toBeHidden();

    // Act
    // 4. Click "New Bug" in the title bar again
    await boardPage.openCreateBugModal();

    // Assert
    await expect(createBugModal.titleInput).toHaveValue("");
    await expect(createBugModal.descriptionInput).toHaveValue("");
  });
});
