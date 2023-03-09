Feature: testing out the various parts of the logIn page
  Scenario: Open the page LogIn
    Given I am on the login page
    When I enter "andrewg9usc.edu" and the "passWord"
    And I press the submit button
#    Then I should see "An error occurred, please try again later" in the page
  Scenario: Open the page LogIn and did not enter email
    Given I am on the login page
    When I enter "" and the "password"
    And I press the submit button
    Then I should see "Email Required" in the page
  Scenario: Open the page LogIn and enter invalid email
    Given I am on the login page
    When I enter "kevin@" and the "password"
    And I press the submit button
    Then I should see "Invalid Email" in the page
  Scenario: Open the page LogIn and enter valid email but no password
    Given I am on the login page
    When I enter "kevindon@usc.edu" and the ""
    And I press the submit button
    Then I should see "Password Required" in the page

