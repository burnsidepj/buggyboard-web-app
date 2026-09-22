import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Reaching the confirmation", () => {
  test("delete-button-opens-confirmation", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
    deleteConfirmationModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Confirm prompt"),
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
    await expect(deleteConfirmationModal.heading).toBeVisible();
    await expect(deleteConfirmationModal.message).toHaveText(
      `Are you sure you want to delete bug #${bug.id}: ${bug.title}?`
    );
    await expect(deleteConfirmationModal.deleteButton).toBeVisible();
    await expect(deleteConfirmationModal.cancelButton).toBeVisible();
  });
});
