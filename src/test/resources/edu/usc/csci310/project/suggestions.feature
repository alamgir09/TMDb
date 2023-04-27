Feature: Generate suggestions for new movies

  Scenario: Get list of suggested movies based on one or more of user’s watchlist
    Given I am on the watchlist
    When I click create suggestion list
    And I make the name "Watchlist 1"
    And I select "Sourcelist"
    And I click create
    Then I should see Creating Suggestions Based On "Sourcelist"

  Scenario: Create suggested watchlists with unique watchlist name and press “Enter” key giving success message
    Given I am on the watchlist
    When I click create suggestion list
    And I make the name "Unique"
    And I select "Sourcelist"
    And I click enter
    Then I should see Confirmation: Watchlist "Unique" created

  Scenario: Input number of suggested movies user wants as 5 and receives success message
    Given I am on the watchlist
    When I click create suggestion list
    And I make the name "Watchlist3"
    And I want "5" movies
    And I select "Sourcelist"
    And I click enter
    Then I should see Confirmation: "5" recommendations

  Scenario: Create suggested watchlists with duplicate watchlist name that already exists giving error message
    Given I am on the watchlist
    When I click create suggestion list
    And I make the name "Sourcelist"
    And I want "5" movies
    And I select "Sourcelist"
    And I click enter
    Then I should see error "Error: Watchlist Name Exists"

  Scenario: Input number of suggested movies user wants as 0 generating error message
    Given I am on the watchlist
    When I click create suggestion list
    And I make the name "Watchlist5"
    And I enter out of bounds number
    And I select "Sourcelist"
    And I click enter
    Then I should see error "Error: number must be >= 1 and <= 10"

  Scenario: User does not select a sourcelist and error displays
    Given I am on the watchlist
    When I click create suggestion list
    And I make the name "Watchlist6"
    And I click enter
    Then I should see error "Error: At least 1 Source List Must Be Selected"



