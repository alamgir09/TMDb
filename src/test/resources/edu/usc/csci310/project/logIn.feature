Feature: testing out the various parts of the logIn page
  Scenario: LogIn to with valid account
    Given I am on the login page
    When I enter "tommyTrojan" and the "Password123"
    And I press the submit button
    Then I should see "Success" in the page

  Scenario: LogIn with invalid account that doesn't exist
    Given I am on the login page
    When I enter "rando" and the "passingBy"
    And I press the submit button
    Then I should see "Username not found" in the page

  Scenario:  LogIn with leaving blank input boxes
    Given I am on the login page
    When I enter "" and the ""
    And I press the submit button
    Then I should see "" in the page

  Scenario: User doesn't have account, makes one by clicking href link
    Given I am on the login page
    When I click on the "Sign up!" hyperlink at the bottom
    Then I should be redirected to the SignUp page