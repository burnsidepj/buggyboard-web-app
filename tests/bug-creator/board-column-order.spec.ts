// spec: specs/features/14-bug-creator.md
// seed: tests/seed.spec.ts
import { test, expect } from "../fixtures";
import { seedUser } from "../helpers/seed-user";

test.describe("Bug creator", () => {
  test("board-column-order", async ({ loginPage, boardPage }) => {
    await loginPage.goto();
    await loginPage.login(seedUser.username, seedUser.password);

    await expect(boardPage.bugTable).toBeVisible();
    await expect(boardPage.columnHeaderButtons).toHaveText([/ID/, /Severity/, /Title/, /Owner/, /Creator/]);
  });
});
