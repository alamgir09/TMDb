Feature: testing out the various parts of the logIn page
  Scenario: Open the page LogIn
    Given I am on the login page
    When I enter "andrewg9usc.edu" and the "passWord"
    And I press the submit button
#    Then I should see "An error occurred, please try again later" in the page

  Scenario: Open the page LogIn
    Given I am on the login page
    When I enter "thisisEmail@gmail.com" and the "password"
    And I press the submit button
#    Then I should see "An error occurred, please try again later" in the page

  Scenario: Open the page LogIn
    Given I am on the login page
    When I enter "temp@gmail.com" and the "game"
    And I press the submit button
#    Then I should see "An error occurred, please try again later" in the page