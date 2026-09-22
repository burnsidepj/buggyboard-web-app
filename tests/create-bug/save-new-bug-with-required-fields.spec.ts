import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Saving a bug", () => {
  test("save-new-bug-with-required-fields", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Login fails with special characters");

    // 1. Click "New Bug" in the title bar
    await boardPage.openCreateBugModal();

    // 2-4. Enter a title, select HIGH severity, and enter a description
    await createBugModal.fillForm({
      title,
      severity: "HIGH",
      description: "When I use < and > in my password, login fails.",
    });

    // Act
    // 5. Click Save
    await createBugModal.save();

    // Assert
    await expect(createBugModal.modal).toBeHidden();
    const row = boardPage.bugRows.filter({ hasText: title });
    await expect(row).toHaveCount(1);
    await expect(row.getByTestId("bug-cell-severity")).toHaveText("HIGH");
    await expect(row.getByTestId("bug-cell-owner")).toHaveText(USERNAME);
  });
});
