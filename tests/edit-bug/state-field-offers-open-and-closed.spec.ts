import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Changing bug state", () => {
  test("state-field-offers-open-and-closed", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("State options"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Assert
    await expect(editBugModal.stateSelect).toHaveValue("open");
    await expect(editBugModal.stateSelect.locator("option")).toHaveText([
      "Open",
      "Closed",
    ]);
  });
});
