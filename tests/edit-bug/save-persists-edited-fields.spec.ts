import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Saving and discarding changes", () => {
  test("save-persists-edited-fields", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Before edit"),
      severity: "LOW",
      owner: USERNAME,
      description: "The original description.",
    });
    const newTitle = uniqueTitle("After edit");
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.fillTitle(newTitle);
    await editBugModal.selectSeverity("HIGH");
    await editBugModal.fillDescription("The updated description.");
    await editBugModal.save();

    // Assert
    await expect(editBugModal.modal).toBeHidden();
    const row = boardPage.bugRows.filter({ hasText: newTitle });
    await expect(row).toHaveCount(1);
    await expect(row.getByTestId("bug-cell-severity")).toHaveText("HIGH");

    await boardPage.openBugByTitle(newTitle);
    await expect(editBugModal.titleInput).toHaveValue(newTitle);
    await expect(editBugModal.severitySelect).toHaveValue("high");
    await expect(editBugModal.descriptionInput).toHaveValue(
      "The updated description."
    );
  });
});
