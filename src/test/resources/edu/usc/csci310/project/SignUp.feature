Feature: Create a user account

  Scenario: User signs up successfully
    Given I am on the SignUp page
    When I enter "tim" , "timmy", "Timjan", "password", and "password"
    And I click the submit button
    Then I should be redirected to the LogIn page

  Scenario: User already exists
    Given I am on the SignUp page
    When I enter "Tommy" , "Trojan", "Tomjan", "password", and "password"
    And I click the submit button
    Then I should see "User already exists"

  Scenario: User will enter mismatched passwords
    Given I am on the SignUp page
    When I enter "Tommy" , "Trojan", "Tomjan", "incorrect", and "password"
    And I click the submit button
    Then I should see an error message

  Scenario: User leaves required fields blank
    Given I am on the SignUp page
    When I enter "" , "", "", "", and ""
    And I click the submit button
    Then it should stay on SignUp page

  Scenario: User leave fields empty and returns to logIn page
    Given I am on the SignUp page
    When I click on the "LogIn" hyperlink
    Then I should be redirected to the LogIn page
