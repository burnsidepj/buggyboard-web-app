# User Story

As a BuggyBoard user,
I want each bug to record who created it,
So that I can see who originally reported the issue.


# Bug Creator

- Each bug must have a **Creator** field.
- Creator is the name of the user who created the bug.
- Creator is stored in the database.
- When a bug is created, the app sets Creator to the **current user**.
- Creator **cannot be edited** after it is set (not by the creator, and not by any other user).
- The "New Bug" modal does not include an editable Creator field (like ID and state). The app assigns Creator on save.
- The "Edit Bug" modal displays Creator as **read-only**.


# Design

- The board table displays Creator as a column **immediately to the right of Owner**.
- Column order from left to right is: ID, Severity, Title, Owner, Creator.
- Creator is sortable like the other board columns (see `specs/features/10-sort-board-columns.md`).


# Out of Scope

- Changing Creator after creation (including by admins).
- Filtering or searching by Creator.


# Acceptance Criteria

Scenario: New bugs are created with Creator set to the current user
  Given the user is authenticated into the app as "alice"
  And the user is on the board page
  When the user creates a new bug via the New Bug modal
  Then the bug is saved with Creator "alice"

Scenario: Create-bug modal does not let the user edit Creator
  Given the user is authenticated into the app
  And the user is on the board page
  When the user opens the New Bug modal
  Then the modal does not provide an editable Creator field

Scenario: Edit-bug modal shows Creator as read-only
  Given the user is authenticated into the app
  And the user is on the board page
  And there is a bug in the database created by "alice"
  When the user opens the edit modal for that bug
  Then the modal displays Creator as "alice"
  And the Creator field cannot be edited

Scenario: Board table includes Creator to the right of Owner
  Given the user is authenticated into the app
  When the user is on the board page
  Then the board table has a column for Creator
  And the columns are ordered from left to right: ID, Severity, Title, Owner, Creator

Scenario: Board rows display each bug's Creator
  Given the user is authenticated into the app
  And there is a bug in the database created by "alice"
  When the user is on the board page
  Then that bug's row shows Creator as "alice"
