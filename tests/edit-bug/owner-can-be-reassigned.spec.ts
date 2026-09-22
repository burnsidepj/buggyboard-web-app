import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Saving and discarding changes", () => {
  test("owner-can-be-reassigned", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Reassign owner"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act
    await editBugModal.fillOwner("vanny");
    await editBugModal.save();

    // Assert
    await expect(editBugModal.modal).toBeHidden();
    const row = boardPage.bugRows.filter({ hasText: bug.title });
    await expect(row.getByTestId("bug-cell-owner")).toHaveText("vanny");
  });
});
