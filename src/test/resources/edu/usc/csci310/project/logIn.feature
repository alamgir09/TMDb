Feature: testing out the various parts of the logIn page
  Scenario: Open the page LogIn and enter an existing user
    Given I am on the login page
    When I enter "tommyTrojan" and the "Password123"
    And I press the submit button
    Then I should see "Success" in the page

  Scenario: Open the page LogIn and don't have an account
    Given I am on the login page
    When I press the sign up button
    Then I am on the signup page
