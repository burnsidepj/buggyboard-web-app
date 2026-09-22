import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Save button enablement", () => {
  test("save-disabled-again-when-edit-is-reverted", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Reverted edit"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.fillTitle(`${bug.title} (updated)`);
    await expect(editBugModal.saveButton).toBeEnabled();

    // Restoring the original value clears the dirty state, not just the "touched" state.
    await editBugModal.fillTitle(bug.title);

    // Assert
    await expect(editBugModal.saveButton).toBeDisabled();
  });
});
