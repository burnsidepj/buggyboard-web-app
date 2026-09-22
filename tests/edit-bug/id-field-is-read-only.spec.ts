import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Opening the modal", () => {
  test("id-field-is-read-only", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Read-only id"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Assert
    await expect(editBugModal.idInput).toHaveValue(String(bug.id));
    await expect(editBugModal.idInput).toHaveJSProperty("readOnly", true);
    await expect(editBugModal.titleInput).toBeEditable();
    await expect(editBugModal.ownerInput).toBeEditable();
    await expect(editBugModal.descriptionInput).toBeEditable();
  });
});
