# Create Bug Test Plan

## Application Overview

Authenticated users create bugs from the board page via a **New Bug** button in the title bar. A modal collects title, severity, owner, and description. Save persists the bug and closes the modal; Cancel, the X control, and Escape close without saving. The backdrop does not close the modal. Required fields cannot be blank.

The severity dropdown always has a selected value (default MID) and has no empty option, so a “leave severity blank” UI path is not available. Coverage for severity is the happy-path HIGH selection plus the remaining blank-field cases.

Owner default uses the logged-in user from `users.json` (`buggy`), not the illustrative “alice” name in the feature spec.

## Test Scenarios

### 1. Create bug

**Seed:** `tests/seed.spec.ts`

#### 1.1. open-modal

**File:** `tests/create-bug/open-modal.spec.ts`

**Steps:**
  1. Open the create-bug modal from the board page
    - expect: the Create bug dialog is visible
    - expect: Title, Severity, Owner, and Description fields are visible
    - expect: Save and Cancel buttons are visible

#### 1.2. default-owner-to-current-user

**File:** `tests/create-bug/default-owner-to-current-user.spec.ts`

**Steps:**
  1. Open the create-bug modal from the board page
    - expect: the owner field is pre-filled with the logged-in username (`buggy`)

#### 1.3. save-new-bug-with-required-fields

**File:** `tests/create-bug/save-new-bug-with-required-fields.spec.ts`

**Steps:**
  1. Open the create-bug modal and enter a unique title, HIGH severity, and a description, leaving owner as the default
  2. Click Save
    - expect: the modal is closed
    - expect: a bug with that title, HIGH severity, owner `buggy`, and the entered description exists via GET `/api/bugs`

#### 1.4. cancel-without-saving

**File:** `tests/create-bug/cancel-without-saving.spec.ts`

**Steps:**
  1. Open the create-bug modal and enter data in the fields
  2. Click Cancel
    - expect: the modal is closed
    - expect: no bug with that unique title exists via GET `/api/bugs`

#### 1.5. close-with-x-button

**File:** `tests/create-bug/close-with-x-button.spec.ts`

**Steps:**
  1. Open the create-bug modal and enter data in the fields
  2. Click the Close (X) button
    - expect: the modal is closed
    - expect: no bug with that unique title exists via GET `/api/bugs`

#### 1.6. close-with-escape

**File:** `tests/create-bug/close-with-escape.spec.ts`

**Steps:**
  1. Open the create-bug modal and enter data in the fields
  2. Press Escape
    - expect: the modal is closed
    - expect: no bug with that unique title exists via GET `/api/bugs`

#### 1.7. backdrop-does-not-close

**File:** `tests/create-bug/backdrop-does-not-close.spec.ts`

**Steps:**
  1. Open the create-bug modal and enter data in the fields
  2. Click the dimmed backdrop outside the modal panel
    - expect: the modal remains open
    - expect: the entered field values are still present

#### 1.8. save-blocked-when-required-fields-blank

**File:** `tests/create-bug/save-blocked-when-required-fields-blank.spec.ts`

**Steps:**
  1. Open the create-bug modal
  2. Attempt to save with title, owner, and description blank (owner cleared)
    - expect: the modal remains open
    - expect: the user is informed that Title, Owner, and Description are required

#### 1.9. title-must-not-be-blank

**File:** `tests/create-bug/title-must-not-be-blank.spec.ts`

**Steps:**
  1. Open the create-bug modal, leave title blank, fill owner and description
  2. Attempt to save
    - expect: the modal remains open
    - expect: no new bug is created for that description via GET `/api/bugs`
    - expect: the user is informed that Title is required

#### 1.10. owner-must-not-be-blank

**File:** `tests/create-bug/owner-must-not-be-blank.spec.ts`

**Steps:**
  1. Open the create-bug modal, fill title and description, clear owner
  2. Attempt to save
    - expect: the modal remains open
    - expect: no bug with that unique title exists via GET `/api/bugs`
    - expect: the user is informed that Owner is required

#### 1.11. description-must-not-be-blank

**File:** `tests/create-bug/description-must-not-be-blank.spec.ts`

**Steps:**
  1. Open the create-bug modal, fill title, leave description blank
  2. Attempt to save
    - expect: the modal remains open
    - expect: no bug with that unique title exists via GET `/api/bugs`
    - expect: the user is informed that Description is required
