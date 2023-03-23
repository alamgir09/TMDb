Feature: testing out the various parts of the logIn page
  Scenario: Open the page LogIn and enter an existing user
    Given I am on the login page
    When I enter "tommytrojan@usc.edu" and the "Password123"
    And I press the submit button
    Then I should see "Valid" in the page