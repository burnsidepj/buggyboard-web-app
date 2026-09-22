import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Saving and discarding changes", () => {
  test("escape-discards-changes", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Discarded edit"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);
    const abandoned = uniqueTitle("Should not be saved");

    // Act
    await editBugModal.fillTitle(abandoned);
    // Press the Escape key
    await editBugModal.pressEscape();

    // Assert
    await expect(editBugModal.modal).toBeHidden();
    await expect(boardPage.bugRows.filter({ hasText: bug.title })).toHaveCount(
      1
    );
    await expect(boardPage.bugRows.filter({ hasText: abandoned })).toHaveCount(
      0
    );
  });
});
