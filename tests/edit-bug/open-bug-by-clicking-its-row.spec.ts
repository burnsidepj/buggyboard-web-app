import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Opening the modal", () => {
  test("open-bug-by-clicking-its-row", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Opened from its row"),
      severity: "HIGH",
      owner: USERNAME,
      description: "Clicking the row opens this bug.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    // Act
    await boardPage.openBugByTitle(bug.title);

    // Assert
    await expect(editBugModal.modal).toBeVisible();
    await expect(editBugModal.heading(bug.id)).toBeVisible();
    await expect(editBugModal.titleInput).toHaveValue(bug.title);
    await expect(editBugModal.severitySelect).toHaveValue("high");
    await expect(editBugModal.ownerInput).toHaveValue(bug.owner);
    await expect(editBugModal.descriptionInput).toHaveValue(bug.description);
    await expect(editBugModal.saveButton).toBeVisible();
    await expect(editBugModal.cancelButton).toBeVisible();
    await expect(editBugModal.deleteButton).toBeVisible();
  });
});
