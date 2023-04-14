Feature: Provide Movie Details for displayed movies
  Scenario: clicking on a movie after searching should navigate to a new page
    Given I search for "iron man"
    When I click a movie
    Then I should navigate to a new page
    And I should see the movie's title in the result
    And I should see the movie's image in the result
    And I should see the movie's genres in the result
    And I should see the movie release date in the result
    And I should see the movie rating in the result
    And I should see the movie’s directors in the result
    And I should see the movie’s production studios in the result
    And I should see the movie cast in the result
    And I should see the movie description in the results
    And the cast list does not fit on the screen
    And the cast list should be horizontally scrollable

#  Scenario: The movie details page correctly displays the movie's title
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie's title in the result
#
#  Scenario: The movie details page correctly displays the movie's image
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie's image in the result
#
#  Scenario: The movie details page correctly displays the movie's list of genres
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie's genres in the result
#
#  Scenario: The movie details page correctly displays the release date
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie release date in the result
#
#
#  Scenario: The movie details page correctly displays the move rating
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie rating in the result
#
#
#  Scenario: The movie details page correctly displays the movie directors
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie’s directors in the result
#
#  Scenario: The movie details page correctly displays the movie production studios
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie’s production studios in the result
#
#  Scenario: The movie details page correctly displays the movie cast
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie cast in the result
#
#  Scenario: The movie details page correctly displays the movie description
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And I should see the movie description in the results

#  Scenario: The cast is horizontally scrollable
#    Given I search for "iron man"
#    When I click a movie
#    Then I should navigate to a new page
#    And the cast list does not fit on the screen
#    And the cast list should be horizontally scrollable

  Scenario: The cast is not horizontally scrollable
    Given I search for "All Is Lost"
    When I click a movie
    Then I should navigate to a new page
    And the cast list does fit on the screen
    And the cast list should not be horizontally scrollable

  Scenario: clicking on an actor
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    When I click on "Robert Downey Jr." from the cast list
    Then I should navigate to the search page
    And the search URL should contain Actors
    And the search URL should contain "Robert Downey Jr."
    And the search field should be "Robert Downey Jr."
    And the search criteria should say Actors

  Scenario: clicking on a genre
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    When I click on "Action" from the genre list
    Then I should navigate to the search page
    And the search URL should contain Genres
    And the search URL should contain "Action" genre
    And the search field should be "Action"
    And the search criteria should say Genres

  Scenario: adding a movie to a watchlist
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    And I should see "Add to Watchlist" button
    Then I add the movie to "Watchlist Test"
    Then I should see "Iron Man" in "Watchlist Test"

  Scenario: The movie details page shows the dollar sign
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    And I should see the dollar icon in the result

  Scenario: The movie details page shows the eye icon
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    And I should see the eye icon in the result

  Scenario: Back navigation routes to the exact same page
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    When I click the back button
    Then I should be brought back to the exact same page
