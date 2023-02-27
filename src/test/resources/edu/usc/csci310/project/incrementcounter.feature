Feature: Increment Counter
  Scenario: Press increment counter button
    Given I am on endpoint "other"
    When I click on the increment counter button
    Then I should see the text update to "Current state counter: 1"

  Scenario: Press clear counter button
    Given I am on endpoint "other"
    When I click on the clear counter button
    Then I should see the text update to "Current state counter: 0"