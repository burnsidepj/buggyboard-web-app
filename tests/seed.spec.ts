import { test, expect } from "./fixtures";
import { PASSWORD, USERNAME } from "./helpers/test-data";

/**
 * Seed test: lands the app in the state every scenario starts from — logged in and sitting on
 * the board page. The playwright-cli plan/generate workflow pauses inside this test, so it is
 * where every exploration session begins.
 */
test("seed", async ({ loginPage, boardPage }) => {
  // Arrange
  await loginPage.goto();

  // Act
  await loginPage.login(USERNAME, PASSWORD);

  // Assert
  await expect(boardPage.newBugButton).toBeVisible();
});
