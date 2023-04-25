Feature: Be secure and protect user data

  Scenario: Account is locked after user fails to login 3 times in 1 min
    Given I navigate securely to the "LogIn"
    When I enter "jas" into username and "fail1" into password
    And I submit my login credentials
    When I enter "jas" into username and "fail2" into password
    And I submit my login credentials
    When I enter "jas" into username and "fail3" into password
    And I submit my login credentials
    Then I should see response on the screen "Too many failed attempts. Please retry in 30 seconds..."

  Scenario: Account is not locked after user fails to login 2 times then successfully logs in on the 3rd
    Given I navigate securely to the "LogIn"
    When I enter "jas" into username and "fail1" into password
    And I submit my login credentials
    When I enter "jas" into username and "fail2" into password
    And I submit my login credentials
    When I enter "jas" into username and "jas" into password
    And I submit my login credentials
    Then I should see response on the screen "Success"

