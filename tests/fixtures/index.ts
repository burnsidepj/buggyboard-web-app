import { test as base, expect } from "@playwright/test";
import { BoardPage } from "../pages/board-page";
import { CreateBugModal } from "../pages/create-bug-modal";
import { DeleteConfirmationModal } from "../pages/delete-confirmation-modal";
import { EditBugModal } from "../pages/edit-bug-modal";
import { LoginPage } from "../pages/login-page";

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModal: CreateBugModal;
  editBugModal: EditBugModal;
  deleteConfirmationModal: DeleteConfirmationModal;
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
  deleteConfirmationModal: async ({ page }, use) => {
    await use(new DeleteConfirmationModal(page));
  },
});

export { expect };
