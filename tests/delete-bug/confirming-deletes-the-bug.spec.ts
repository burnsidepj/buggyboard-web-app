import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug, getBugStatus } from "../helpers/bugs-api";

test.describe("Confirming the deletion", () => {
  test("confirming-deletes-the-bug", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
    deleteConfirmationModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Deleted for real"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to delete.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.clickDelete();
    await deleteConfirmationModal.confirm();

    // Assert
    await expect(deleteConfirmationModal.modal).toBeHidden();
    await expect(boardPage.bugRows.filter({ hasText: bug.title })).toHaveCount(
      0
    );
    await expect(async () => {
      expect(await getBugStatus(request, bug.id)).toBe(404);
    }).toPass();
  });
});
