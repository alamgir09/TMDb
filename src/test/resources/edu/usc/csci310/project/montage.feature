Feature: Montage
  Scenario: Montage has at least one picture from every movie in watchlist
    Given I am on watchlist detail page for watchlist "10movies"
    When I press the create montage button
    Then I should be on montage page
    Then I should see at least 10 images
    Then I should see image from movie id "11"
    Then I should see image from movie id "51162"
    Then I should see image from movie id "1726"
    Then I should see image from movie id "18126"
    Then I should see image from movie id "496243"
    Then I should see image from movie id "12"
    Then I should see image from movie id "920"
    Then I should see image from movie id "9502"
    Then I should see image from movie id "862"
    Then I should see image from movie id "496243"

  Scenario: Navigate to Search page from Montage page
    Given I am on watchlist detail page for watchlist "10movies"
    When I press Search on the NavBar
    Then I should see that I am on the Search page

  Scenario: Navigate back to movie details of current watchlist
    Given I am on watchlist detail page for watchlist "10movies"
    When I press the create montage button
    Then I should be on montage page
    When I press the Back button
    Then I am on watchlist detail page for watchlist "10movies"


