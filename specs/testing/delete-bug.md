# Delete Bug Test Plan

## Application Overview

Deleting a bug is a two-step, confirm-first flow. The **Delete** button lives inside the *Edit bug*
modal and does not delete anything on its own — it opens a second modal titled **"Delete bug"** whose
message names the bug: *"Are you sure you want to delete bug #&lt;ID&gt;: &lt;Title&gt;?"*. Confirming
removes the bug and closes **both** modals. Cancelling dismisses only the confirmation and returns
the user to the still-open edit modal with the bug intact.

Source spec: `specs/features/12-delete-bug.md`. Verified against the running app on 2026-09-22 with
`playwright-cli`.

**Data requirement:** every scenario destroys or risks destroying a bug, so each must create its own
bug via the API first. See note 1 — and note 2, which is the trap that will bite code generation.

## Test Scenarios

### 1. Reaching the confirmation

**Seed:** `tests/seed.spec.ts`

#### 1.1. edit-modal-has-a-delete-button

**File:** `tests/delete-bug/edit-modal-has-a-delete-button.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
    - expect: the edit dialog is visible
    - expect: the dialog has a Delete button

#### 1.2. delete-button-opens-confirmation

**File:** `tests/delete-bug/delete-button-opens-confirmation.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
    - expect: a dialog headed "Delete bug" is visible
    - expect: its message reads "Are you sure you want to delete bug #&lt;id&gt;: &lt;title&gt;?"
    - expect: the confirmation dialog has a Delete button
    - expect: the confirmation dialog has a Cancel button

#### 1.3. delete-button-alone-does-not-delete

**File:** `tests/delete-bug/delete-button-alone-does-not-delete.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
    - expect: the confirmation dialog is visible
    - expect: the bug still exists (GET its id returns 200)

### 2. Confirming the deletion

**Seed:** `tests/seed.spec.ts`

#### 2.1. confirming-deletes-the-bug

**File:** `tests/delete-bug/confirming-deletes-the-bug.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
  4. Click Delete in the confirmation dialog
    - expect: no dialog is visible
    - expect: the bug's title no longer appears on the board
    - expect: GET for that bug's id returns 404

#### 2.2. confirming-closes-both-modals

**File:** `tests/delete-bug/confirming-closes-both-modals.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
  4. Click Delete in the confirmation dialog
    - expect: the "Delete bug" confirmation dialog is not visible
    - expect: the "Edit bug #&lt;id&gt;" dialog is not visible

### 3. Backing out of the deletion

**Seed:** `tests/seed.spec.ts`

#### 3.1. cancelling-returns-to-the-edit-modal

**File:** `tests/delete-bug/cancelling-returns-to-the-edit-modal.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
  4. Click Cancel in the confirmation dialog
    - expect: the confirmation dialog is not visible
    - expect: the "Edit bug #&lt;id&gt;" dialog is still visible
    - expect: the Title field still contains the bug's original title
    - expect: the bug still exists (GET its id returns 200)

#### 3.2. cancelling-preserves-unsaved-edits

**File:** `tests/delete-bug/cancelling-preserves-unsaved-edits.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Change the Title field to "Edited but not saved"
  4. Click Delete in the edit dialog
  5. Click Cancel in the confirmation dialog
    - expect: the edit dialog is still visible
    - expect: the Title field still contains "Edited but not saved"

#### 3.3. escape-dismisses-only-the-confirmation

**File:** `tests/delete-bug/escape-dismisses-only-the-confirmation.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
  4. Press the Escape key
    - expect: the confirmation dialog is not visible
    - expect: the "Edit bug #&lt;id&gt;" dialog is still visible
    - expect: the bug still exists (GET its id returns 200)

#### 3.4. x-button-dismisses-only-the-confirmation

**File:** `tests/delete-bug/x-button-dismisses-only-the-confirmation.spec.ts`

**Steps:**
  1. Create a bug with a unique title via the API
  2. Reload the board and click the bug's row
  3. Click Delete in the edit dialog
  4. Click the X button in the confirmation dialog's header
    - expect: the confirmation dialog is not visible
    - expect: the "Edit bug #&lt;id&gt;" dialog is still visible
    - expect: the bug still exists (GET its id returns 200)

---

## Notes from live exploration

1. **Every scenario needs its own bug.** Deletion is destructive and the database is never reset
   between runs, so create a bug with a unique title via `POST /api/bugs` in the arrange step (the
   API needs no authentication), then reload the board. Never delete a row that happens to be there.

2. **Selector trap — while the confirmation is open, both dialogs are in the DOM at once.** The edit
   modal is not unmounted, so these names each resolve to **two** buttons and an unscoped locator
   fails with a strict-mode violation:

   | Name | Matches |
   |---|---|
   | `Delete` | the edit modal's Delete **and** the confirmation's Delete |
   | `Cancel` | the edit modal's Cancel **and** the confirmation's Cancel |
   | `Close` | both modals' X buttons (plus the board's "Closed" filter, without `exact: true`) |

   Scope by dialog rather than reaching for `.nth(1)`, which silently depends on DOM order:

   ```ts
   const confirmation = page.getByRole('dialog').filter({ hasText: 'Are you sure' });
   await confirmation.getByRole('button', { name: 'Delete' }).click();
   ```

   Note that `page.getByRole('dialog')` on its own is also ambiguous once the confirmation is open —
   it must be filtered.

3. **Escape and the X close only the confirmation**, leaving the edit modal open (scenarios 3.3,
   3.4). `specs/features/12-delete-bug.md` describes only the Cancel button, so these two scenarios
   cover behavior the spec does not state.

4. **The confirmation message is exact**, including the `#`, the colon, and the trailing question
   mark: `Are you sure you want to delete bug #8: Edit-flow probe bug?`

5. **Selector trap — board rows** are `<button>` elements inside the table body, not `row` elements.
   Locate one with `page.getByRole('button').filter({ hasText: '<unique title>' })`.

6. **A closed bug can still be deleted**, but it is only reachable after switching the state filter
   to "Closed", since the board defaults to Open. Worth adding if state-filtered deletion matters.
