import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Save button enablement", () => {
  test("save-disabled-when-required-field-blanked", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Blank a required field"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act + Assert
    await editBugModal.fillTitle("");
    await expect(editBugModal.saveButton).toBeDisabled();

    await editBugModal.fillTitle(`${bug.title} (updated)`);
    await expect(editBugModal.saveButton).toBeEnabled();

    await editBugModal.fillDescription("");
    await expect(editBugModal.saveButton).toBeDisabled();
  });
});
