Feature: Provide Movie Details for displayed movies

  Scenario: Click a movie after searching redirects to a new page
    Given I search for "iron man"
    When I click on the top result
    Then I should navigate to a new page

  Scenario: The movie details page displays all the correct information
    Given I search for "iron man"
    When I click on the top result
    Then I should navigate to a new page
#    Given I am on the movie details page
    Then I should see the movie's title in the result
    And I should see the movie's image in the result
    And I should see the movie's genres in the result
    And I should see the movie release date in the result
    And I should see the movie rating in the result
    And I should see the movie’s directors in the result
    And I should see the movie’s production studios in the result
    And I should see the movie cast in the result
    And I should see the movie description in the results
    And I should see the dollar icon in the result
    And I should see the eye icon in the result
    And the cast list should be horizontally scrollable
    And I add movie to "Sourcelist"
    Then I should see "Iron Man" in "Sourcelist" watchlist

  Scenario: The cast is not horizontally scrollable
    Given I search for "all is lost"
    When I click on the top result
    Then I should navigate to a new page
#    Given I am on the movie details page for all is lost
    And the cast list should not be horizontally scrollable

  Scenario: clicking on an actor
    Given I search for "iron man"
    When I click on the top result
    Then I should navigate to a new page
#    Given I am on the movie details page
    When I click on "Robert Downey Jr." from the cast list
    Then I should navigate to the search page
    And the search URL should contain Actors
    And the search URL should contain "Robert Downey Jr."
    And the search field should be "Robert Downey Jr."
    And the search criteria should say Actors

  Scenario: clicking on a genre
    Given I search for "iron man"
    When I click on the top result
    Then I should navigate to a new page
#    Given I am on the movie details page
    When I click on "Action" from the genre list
    Then I should navigate to the search page
    And the search URL should contain Keywords
    And the search URL should contain "Action" genre
    And the search field should be "Action"
    And the search criteria should say Keywords
    
  Scenario: adding a movie to a watchlist
    Given I search for "Iron Man"
    When I click a movie
    Then I should navigate to a new page
    And I should see "Add to Watchlist" button
    And I add the movie to "Watchlist Test"
    And I should see "Iron Man" in "Watchlist Test"

#  Scenario: Back navigation routes to the exact same page
#    Given I search for "Iron Man"
#    When I click a movie
#    Then I should navigate to a new page
#    When I click the back button
#    Then I should be brought back to the exact same page