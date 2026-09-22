// spec: specs/features/14-bug-creator.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Bug creator", () => {
  test("board-row-shows-creator", async ({ loginPage, boardPage, bugsApi }) => {
    const title = `Board shows creator ${crypto.randomUUID()}`;
    await bugsApi.createBug({
      title,
      severity: "LOW",
      owner: "vanny",
      creator: seedUser.username,
      description: "Seeded so the board can show Creator.",
    });

    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);

    const row = boardPage.tableBodyRows.filter({ hasText: title });
    await expect(row).toBeVisible();
    await expect(row.locator("td").nth(3)).toHaveText("vanny");
    await expect(row.locator("td").nth(4)).toHaveText(seedUser.username);
  });
});
