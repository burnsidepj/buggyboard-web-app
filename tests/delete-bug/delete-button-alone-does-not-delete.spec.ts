import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug, getBugStatus } from "../helpers/bugs-api";

test.describe("Reaching the confirmation", () => {
  test("delete-button-alone-does-not-delete", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
    deleteConfirmationModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Not yet deleted"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to delete.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.clickDelete();

    // Assert
    await expect(deleteConfirmationModal.modal).toBeVisible();
    expect(await getBugStatus(request, bug.id)).toBe(200);
  });
});
