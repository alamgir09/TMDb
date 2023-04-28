Feature: Compare public watchlist with other uesrs

  Scenario: Compare watchlist with another user
    Given I am on the watchlist detail page for "Watchlist 1"
    When I click on "Compare Watchlist" button
    And I click on "JLee" user
    And I click on "Happy" watchlist
    Then I should see a list containing union of both users watchlist