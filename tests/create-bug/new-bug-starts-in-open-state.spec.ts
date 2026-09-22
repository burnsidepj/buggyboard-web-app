import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";

test.describe("Saving a bug", () => {
  test("new-bug-starts-in-open-state", async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    const title = uniqueTitle("Starts open");

    // 1. Create a bug with valid values in every field
    await boardPage.openCreateBugModal();
    await createBugModal.fillForm({
      title,
      severity: "LOW",
      description: "A newly created bug should be OPEN.",
    });
    await createBugModal.save();
    await expect(createBugModal.modal).toBeHidden();

    // Assert
    // 2. The state filter is still on its default "Open" setting
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(1);

    // Act
    // 3. Switch the state filter to "Closed"
    await boardPage.filterByClosed();

    // Assert
    await expect(boardPage.bugRows.filter({ hasText: title })).toHaveCount(0);
  });
});
