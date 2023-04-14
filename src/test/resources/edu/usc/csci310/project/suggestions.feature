#Feature: Generate suggestions for new movies
#  Scenario: Get list of suggested movies based on one or more of user’s watchlist
#    Given I am on the watchlist page
#    When I select all watchlists I want to generate suggestions from (“Movie Nights”)
#    And I press “Generate Suggestions” button
#    Then I should see “Creating suggestions based on Movie Nights Watchlist”
#
#  Scenario: Create suggested watchlists with unique watchlist name and press “Enter” key giving success message
#    Given I am on the watchlist page
#    When I press the “Generate Suggestions” button
#    And I enter watchlist name “Halloween”
#    Then I should see "Confirmation: Watchlist Halloween Created " on the page
#
#  Scenario: Create suggested watchlists with duplicate watchlist name that already exists giving error message
#    Given I am on the watchlist page
#    When I press the “Generate Suggestions” button
#    And I enter  watchlist name “Halloween”
#    Then I should see "Error: Watchlist Name Exists " on the page
#
#  Scenario: Input number of suggested movies user wants as 5 and receives success message
#    Given I am on the watchlist page
#    When I press the “Generate Suggestions” button
#    And I enter “5” movies into text box "number of suggestions"
#    Then I should see "Confirmation: 5 recommendations " on the page
#
#  Scenario: Input number of suggested movies user wants as 0 generating error message
#    Given I am on the watchlist page
#    When I press the “Generate Suggestions” button
#    And I enter “0” movies into text box "number of suggestions"
#    Then I should see "Error: number must be >= 1 and <= 10" on the page
#
#  Scenario: Input number of suggested movies user wants as 11 generating error message
#    Given I am on the watchlist page
#    When I press the “Generate Suggestions” button
#    And I enter “11” movies into text box "number of suggestions"
#    Then I should see "Error: number must be >= 1 and <= 10 " on the page
#
#
