import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Saving and discarding changes", () => {
  test("backdrop-click-does-not-close", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Backdrop probe in edit"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);
    const edited = uniqueTitle("Backdrop probe");

    // Act
    await editBugModal.fillTitle(edited);
    await editBugModal.clickBackdrop();

    // Assert
    await expect(editBugModal.modal).toBeVisible();
    await expect(editBugModal.titleInput).toHaveValue(edited);
  });
});
