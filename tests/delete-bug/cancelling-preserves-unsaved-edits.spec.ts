import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Backing out of the deletion", () => {
  test("cancelling-preserves-unsaved-edits", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
    deleteConfirmationModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Unsaved edit kept"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to delete.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);
    const edited = uniqueTitle("Edited but not saved");

    // Act
    await editBugModal.fillTitle(edited);
    await editBugModal.clickDelete();
    await deleteConfirmationModal.cancel();

    // Assert
    await expect(editBugModal.modal).toBeVisible();
    await expect(editBugModal.titleInput).toHaveValue(edited);
  });
});
