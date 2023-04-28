Feature: Search for movies based on various criteria

  Scenario: search for movies should return title
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see a title in the result

  Scenario: search for movies should return release date
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see a release date in the result

  Scenario: search for movies should return image
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see an image in the result

  Scenario: search for movies should return rating
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see a rating in the result

  Scenario: missing movie data should return "?"
    Given I am on the search page
    When I enter "?" into search input
    And I press the submit search button
    Then I should see "?" rating as a result

  Scenario: should show "0 results" when input field is empty
    Given I am on the search page
    When I press the submit search button
    Then I should see "Showing 0 result(s)." in results div

  Scenario: search default should be All
    Given I am on the search page
    Then I should see the filter be "All"

  Scenario: search filter by Title should return movies with that title
    Given I am on the search page
    When I enter "iron man" into search input
    And I filter by "Title"
    And I press the submit search button
    Then I should see "Iron Man" title as a result

  Scenario: search filter by Actors should return movies by that actor
    Given I am on the search page
    When I enter "tom holland" into search input
    And I filter by "Actors"
    And I press the submit search button
    Then I should see "Spider-Man: Homecoming" title as a result

  Scenario: search filter by Keywords should return movies with that keyword
    Given I am on the search page
    When I enter "action" into search input
    And I filter by "Keywords"
    And I press the submit search button
    Then I should see "Bitter Night" title as a result

  Scenario: hovering over a movie should show the "Add to Watchlist" button
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see "Add to Watchlist" button on hover of a movie

  Scenario: hovering over a movie should show the "eye icon"
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see the eye icon on hover of a movie

  Scenario: hovering over a movie should show the "dollar icon"
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see the dollar icon on hover of a movie

  Scenario: Successfully add new movie to watchlist with success confirmation
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    And I add the movie to "Watchlist Test"
    Then I should see "Iron Man" in "Watchlist Test"

  Scenario:  Attempts to add duplicate movie to watchlist giving with error
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    And I add the movie to "Watchlist Test"
    Then I should see "Movie already exists" on the search page

  Scenario: clicking on the myWatchlist button in NavBar redirects to Watchlists page
    Given I am on the search page
    When I press the myWatchList button
    Then I should be on the Watchlists page

  Scenario: clicking on the Log Out button in NavBar redirects to Log In page
    Given I am on the search page
    When I press the Log Out button
    Then I should be on the Log In page

#
#  Scenario: Click eye icon and see movie is not in any watchlist
#    Given I am on the search page
#    When I press the eye icon on movie
#    Then I should see "Not in any watchlists"
#
#  Scenario: Click eye icon and see movie is in at least on watchlist
#    Given I am on the search page
#    When I press the eye icon on movie
#    Then I should see movie in "Horror watchlist"
#
  Scenario: Year picker defaults to no year
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    Then I should see movies from all years

  Scenario: Year picker selects starting year without ending
    Given I am on the search page
    When I enter "iron man" into search input
    And I select starting year "2013"
    And I press the submit search button
    Then I should see all movies made after starting year "2013"

  Scenario: Year picker selects ending year without starting
    Given I am on the search page
    When I enter "iron man" into search input
    And I select ending year "2013"
    And I press the submit search button
    Then I should see all movies made before starting year "2013"

  Scenario: Year picker selects starting year and ending year
    Given I am on the search page
    When I enter "iron man" into search input
    And I select starting year "2008"
    And I select ending year "2013"
    And I press the submit search button
    Then I should see all movies made after starting year "2008"
    And I should see all movies made before starting year "2013"

  Scenario: Select dollar sign and get free movie ticket
    Given I am on the search page
    When I enter "iron man" into search input
    And I press the submit search button
    And I select the dollar icon
    Then I should be redirected to movie theatre website