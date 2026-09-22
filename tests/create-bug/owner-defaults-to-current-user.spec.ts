import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Field defaults", () => {
  test("owner-defaults-to-current-user", async ({
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
    await expect(createBugModal.ownerInput).toHaveValue(USERNAME);
  });
});
