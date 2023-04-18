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
