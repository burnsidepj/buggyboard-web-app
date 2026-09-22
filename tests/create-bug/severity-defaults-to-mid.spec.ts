import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Field defaults", () => {
  test("severity-defaults-to-mid", async ({
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
    // The option values are lower case while the labels the user sees are upper case.
    await expect(createBugModal.severitySelect).toHaveValue("mid");
    await expect(createBugModal.severitySelect.locator("option")).toHaveText([
      "HIGH",
      "MID",
      "LOW",
    ]);
  });
});
