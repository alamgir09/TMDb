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



  # navigate to search
  # add button to go back to page with movie details page







#    Then style should have varying degrees from -45 deg to 45 deg
#Feature: Montage
#Scenario: Select "Create Montage" button and brings you to Montage page in less than 1.5 seconds
#Given I am on the watchlist page
#When I press the Create Montage button
#Then I should see "Montage" in the page
#
#Scenario: Montage should have at least one picture from each movie in watchlist
#Given I am on the watchlist page
#When I press the Create Montage button
#Then I should see "Montage" in the page and a at lease one picture from each movie in watchlist
#
#Scenario: Montage should have a minimum of 10 pictures
#Given I am on the watchlist page
#When I press the Create Montage button
#Then I should see "Montage" in the page and a minimum of "10" pictures
#
#Scenario: Montage should have varying degrees from -45 deg to 45 deg
#Given I am on the watchlist page
#When I press the Create Montage button
#Then I should see "Montage" in the page and pictures that rotate with varying angles from -45 deg to 45 deg
#
#Scenario: Montage should slightly overlap
#Given I am on the watchlist page
#When I press the Create Montage button
#Then I should see "Montage" in the page with pictures that slightly overlap
#
#Scenario: Navigate to "Search" page from Montage page
#Given I am on the "Montage" page
#When I press the Search button on NavBar
#Then I should see page navigate to "Search" page
#
#Scenario: Navigate to "myWatchLists" page (list of all watch lists) from Montage page
#Given I am on the "Montage" page
#When I press the "MyWatchList" button on NavBar
#Then I should see page navigate to "WatchLists" page
#
#Scenario: Navigate to back to "Halloween" watchlist page from Montage page
#Given I am on the "Montage" page
#When I press the "return to Halloween watchlist" button
#Then I should see page navigate back to "Halloween watchlist" page
#


