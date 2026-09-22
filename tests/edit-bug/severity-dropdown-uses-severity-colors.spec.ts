import { test, expect } from "../fixtures";
import { PASSWORD, USERNAME, uniqueTitle } from "../helpers/test-data";
import { createBug } from "../helpers/bugs-api";

test.describe("Opening the modal", () => {
  test("severity-dropdown-uses-severity-colors", async ({
    request,
    loginPage,
    boardPage,
    editBugModal,
  }) => {
    // Arrange
    const bug = await createBug(request, {
      title: uniqueTitle("Severity colors in edit"),
      severity: "MID",
      owner: USERNAME,
      description: "A bug to edit.",
    });
    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);
    await boardPage.openBugByTitle(bug.title);

    // Act + Assert
    await editBugModal.selectSeverity("HIGH");
    await expect(editBugModal.severitySelect).toHaveCSS(
      "color",
      "rgb(184, 74, 46)"
    );

    await editBugModal.selectSeverity("MID");
    await expect(editBugModal.severitySelect).toHaveCSS(
      "color",
      "rgb(166, 124, 71)"
    );

    await editBugModal.selectSeverity("LOW");
    await expect(editBugModal.severitySelect).toHaveCSS(
      "color",
      "rgb(74, 107, 94)"
    );
  });
});
