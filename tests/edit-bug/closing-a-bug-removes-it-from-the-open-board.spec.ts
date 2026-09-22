import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Changing bug state", () => {
  test("closing-a-bug-removes-it-from-the-open-board", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Closing a bug"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.selectState("Closed");
    await editBugModal.save();

    // Assert
    await expect(editBugModal.modal).toBeHidden();
    await expect(boardPage.bugRows.filter({ hasText: bug.title })).toHaveCount(
      0
    );

    await boardPage.filterByClosed();
    await expect(boardPage.bugRows.filter({ hasText: bug.title })).toHaveCount(
      1
    );
  });
});
