import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug, getBugStatus } from "../helpers/bugs-api";

test.describe("Backing out of the deletion", () => {
  test("cancelling-returns-to-the-edit-modal", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
    deleteConfirmationModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Cancelled deletion"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to delete.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.clickDelete();
    await deleteConfirmationModal.cancel();

    // Assert
    await expect(deleteConfirmationModal.modal).toBeHidden();
    await expect(editBugModal.heading(bug.id)).toBeVisible();
    await expect(editBugModal.titleInput).toHaveValue(bug.title);
    expect(await getBugStatus(request, bug.id)).toBe(200);
  });
});
