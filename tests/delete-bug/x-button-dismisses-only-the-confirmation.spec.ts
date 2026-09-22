import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug, getBugStatus } from "../helpers/bugs-api";

test.describe("Backing out of the deletion", () => {
  test("x-button-dismisses-only-the-confirmation", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
    deleteConfirmationModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Confirmation dismissed"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to delete.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.clickDelete();
    await expect(deleteConfirmationModal.modal).toBeVisible();
    // Click the X in the confirmation header
    await deleteConfirmationModal.close();

    // Assert
    await expect(deleteConfirmationModal.modal).toBeHidden();
    await expect(editBugModal.heading(bug.id)).toBeVisible();
    expect(await getBugStatus(request, bug.id)).toBe(200);
  });
});
