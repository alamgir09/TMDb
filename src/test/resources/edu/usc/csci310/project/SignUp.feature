Feature: SignUp As a new user I want to create an account So that I can access the application

  Scenario: User signs up successfully
    Given I am on the SignUp page
    When I enter my first name "tim" , last name "timmy", user name "Timjan", my password "password", and confirming password "password"
    And I click the submit button
    Then I should be redirected to the LogIn page

  Scenario: User already exists
    Given I am on the SignUp page
    When I enter my first name "Tommy" , last name "Trojan", user name "Tomjan", my password "password", and confirming password "password"
    And I click the submit button
    Then I should see "User already exists"

  Scenario: User will enter mismatched passwords
    Given I am on the SignUp page
    When I enter my first name "Tommy" , last name "Trojan", user name "Tomjan", my password "incorrect", and confirming password "password"
    And I click the submit button
    Then I should see an error message "Password does not match. Please try again."

  Scenario: User leaves required fields blank
    Given I am on the SignUp page
    When I enter my first name "" , last name "", user name "", my password "", and confirming password ""
    And I click the submit button
    Then it should stay on SignUp page

  Scenario: User leave fields empty and returns to logIn page
    Given I am on the SignUp page
    When I click on the "LogIn" hyperlink
    Then I should be redirected to the LogIn page
