import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Opening and closing the modal", () => {
  test("open-create-bug-modal", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // Act
    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // Assert
    await expect(createBugModal.heading).toBeVisible();
    await expect(createBugModal.titleInput).toBeVisible();
    await expect(createBugModal.severitySelect).toBeVisible();
    await expect(createBugModal.ownerInput).toBeVisible();
    await expect(createBugModal.descriptionInput).toBeVisible();
    await expect(createBugModal.saveButton).toBeVisible();
    await expect(createBugModal.cancelButton).toBeVisible();
  });
});
