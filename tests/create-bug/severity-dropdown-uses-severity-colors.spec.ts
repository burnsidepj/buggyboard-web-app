import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME } from "../helpers/test-data";

test.describe("Saving a bug", () => {
  test("severity-dropdown-uses-severity-colors", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // Act + Assert
    // 2. HIGH is the strong terracotta #b84a2e
    await createBugModal.selectSeverity("HIGH");
    await expect(createBugModal.severitySelect).toHaveCSS(
      "color",
      "rgb(184, 74, 46)"
    );

    // 3. MID is the amber #a67c47
    await createBugModal.selectSeverity("MID");
    await expect(createBugModal.severitySelect).toHaveCSS(
      "color",
      "rgb(166, 124, 71)"
    );

    // 4. LOW is the muted sage #4a6b5e
    await createBugModal.selectSeverity("LOW");
    await expect(createBugModal.severitySelect).toHaveCSS(
      "color",
      "rgb(74, 107, 94)"
    );
  });
});
