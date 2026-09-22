import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { BoardPage } from "../pages/board-page";
import { CreateBugModal } from "../pages/create-bug-modal";
import { EditBugModal } from "../pages/edit-bug-modal";
import { BugsApi } from "../helpers/bugs-api";

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModal: CreateBugModal;
  editBugModal: EditBugModal;
  bugsApi: BugsApi;
};

export const test = base.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  createBugModal: async ({ page }, use) => {
    await use(new CreateBugModal(page));
  },
  editBugModal: async ({ page }, use) => {
    await use(new EditBugModal(page));
  },
  bugsApi: async ({ request }, use) => {
    await use(new BugsApi(request));
  },
});

export { expect };
