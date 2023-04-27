Feature: Create and save movie watch lists

  Scenario: Create a new unique watchlist
    Given I am on the watchlist page
    When I press the create watchlist button
    And I type "Watchlist Unique" into modal
    And I press the create button
    Then I should see "Watchlist Unique" on the watchlist page

  Scenario: Create an existing watchlist
    Given I am on the watchlist page
    When I press the create watchlist button
    And I type "Watchlist 1" into modal
    And I press the create button
    Then I should see "Watchlist already exists" error message on the modal

  Scenario: Edit watchlist name and confirm
    Given I am on the watchlist page
    When I press the edit watchlist for button for "Watchlist 1"
    And I type "Watchlist Edited" into edit watchlist modal
    And I press the create button
    Then I should see "Watchlist Edited" on the watchlist page

  Scenario: Delete a watchlist and press confirm should delete the watchlist
    Given I am on the watchlist page
    When I press the delete watchlist button for "Watchlist Unique"
    And I press the create button
    Then I should not see "Watchlist Unique" on the page

  Scenario: Change "Watchlist Edited" back to "Watchlist 1" confirm
    Given I am on the watchlist page
    When I press the edit watchlist for button for "Watchlist Edited"
    And I type "Watchlist 1" into edit watchlist modal
    And I press the create button
    Then I should see "Watchlist 1" on the watchlist page

#  Scenario: Add "Watchlist 1" back to Watchlists
#    Given I am on the watchlist page
#    When I press the create watchlist button
#    And I type "Watchlist 1" into modal
#    And I press the create button
#    Then I should see "Watchlist 1" on the watchlist page

  Scenario: On click of deleting a watchlist but clicking cancel should not delete it
    Given I am on the watchlist page
    When I press the delete watchlist button
    And I press the cancel button
    Then I should not see the pop-up modal
    And I should see "Watchlist 1" on the watchlist page

  Scenario: On click of watchlist should take to watchlist detail page
    Given I am on the watchlist page
    When I press on Watchlist Test Div
    Then I should see "Watchlist Test" on the watchlist page

  Scenario: Watchlist detail page should show movies
    Given I am on the watchlist detail page for "Watchlist Test"
    Then I should see "Poster" on the watchlist page
    And I should see "Title" on the watchlist page
    And I should see "Release Date" on the watchlist page
    And I should see "Rating" on the watchlist page

  Scenario: Change watchlist type from Private to Public for "Watchlist Test"
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the change watchlist type button
    And I press the "publicWatchlist" dropdown menu item
    Then I should see "Public" on the watchlist page

  Scenario: Change watchlist type back to Private for "Watchlist Test"
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the change watchlist type button
    And I press the "privateWatchlist" dropdown menu item
    Then I should see "Private" on the watchlist page

  Scenario: Copy Movie to another Watchlist (by clicking on copy-icon, clicking confirm)
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-copy" where movie box is "Iron Man 2"
    And I click on "Watchlist 1" dropdown item
    And I press the confirm button
    Then I should see "Iron Man 2" on "Watchlist 1"

  Scenario: Delete Movie from a Watchlist and confirm (by clicking on delete-icon, clicking confirm)
    Given I am on the watchlist detail page for "Watchlist 1"
    When I press the "fa-trash" where movie box is "Iron Man 2"
    And I press the confirm button
    Then I should not see "Iron Man 2" on the page

  Scenario: Move Movie to another Watchlist and confirm (by clicking on move-icon, clicking confirm)
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-arrow-right-from-bracket" where movie box is "Iron Man 2"
    And I click on "Watchlist 1" dropdown item
    And I press the confirm button
    Then I should not see "Iron Man 2" on the page
    And I should see "Iron Man 2" on "Watchlist 1"

  Scenario: Move "Iron Man 2" back to Watchlist Test and confirm
    Given I am on the watchlist detail page for "Watchlist 1"
    When I press the "fa-arrow-right-from-bracket" where movie box is "Iron Man 2"
    And I click on "Watchlist Test" dropdown item
    And I press the confirm button
    Then I should not see "Iron Man 2" on the page
    And I should see "Iron Man 2" on "Watchlist Test"

  Scenario: click on copy-icon and cancel should not perform the action and closes the modal
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-copy" where movie box is "Iron Man 2"
    And I click on "Watchlist 1" dropdown item
    And I press the cancel button
    Then I should not see the pop-up modal

  Scenario: click on delete-icon and cancel should not perform the action and closes the modal
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-trash" where movie box is "Iron Man 2"
    And I press the cancel button
    Then I should not see the pop-up modal

  Scenario: click on move-icon and cancel should not perform the action and closes the modal
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-arrow-right-from-bracket" where movie box is "Iron Man 2"
    And I click on "Watchlist 1" dropdown item
    And I press the cancel button
    Then I should not see the pop-up modal

  Scenario: copy movie into another watchlist but already exists should throw error message
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-copy" where movie box is "Iron Man"
    And I click on "Watchlist 1" dropdown item
    And I press the confirm button
    Then I should see "Movie already exists" on the watchlist page

  Scenario: move movie into another watchlist but already exists should throw error message
    Given I am on the watchlist detail page for "Watchlist Test"
    When I press the "fa-arrow-right-from-bracket" where movie box is "Iron Man"
    And I click on "Watchlist 1" dropdown item
    And I press the confirm button
    Then I should see "Movie already exists" on the watchlist page

  Scenario: Delete "Iron Man" from "Watchlist 1"
    Given I am on the watchlist detail page for "Watchlist 1"
    When I press the "fa-trash" where movie box is "Iron Man 2"
    And I press the confirm button
    Then I should not see "Iron Man 2" on the page

  Scenario: Compare watchlist with another user
    Given I am on the watchlist detail page for "Watchlist 1"
    When I click on "Compare Watchlist" button
    And I click on "JLee" user
    And I click on "Happy" watchlist
    Then I should see merged watchlist

#  Scenario: clicking on the Search button in NavBar redirects to Search page
#    Given I am on the watchlist page
#    When I press Search on the navbar
#    Then I should be on the search page

  Scenario: clicking on the myWatchlist button in NavBar redirects to Watchlists page
    Given I am on the watchlist detail page for "Watchlist 1"
    When I press "MyWatchLists" on the navbar
    Then I should be on the Watchlist page