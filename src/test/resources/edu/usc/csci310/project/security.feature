Feature: Be secure and protect user data

  # trying to access pages without SSL
  Scenario: Attempting to access Search page without SSL
    And I navigate to the "Search" without SSL
    Then I should see error message and not be able to access the page  without SSl

  Scenario: Attempting to access Watchlist page without SSL
    And I navigate to the "Watchlist" without SSL
    Then I should see error message and not be able to access the page  without SSl

  Scenario: Attempting to access WatchlistDetail page without SSL
    And I navigate to the "WatchlistDetail" without SSL
    Then I should see error message and not be able to access the page  without SSl

  Scenario: Attempting to access SignUp page without SSL
    And I navigate to the "SignUp" without SSL
    Then I should see error message and not be able to access the page  without SSl

  Scenario: Attempting to access LogIn page without SSL
    And I navigate to the "LogIn" without SSL
    Then I should see error message and not be able to access the page  without SSl

    # Only logged in users can access pages
  Scenario: Can access SignUp page without logging in
    Given I navigate securely to the "SignUp"
    Then I should see that I am on the "SignUp" page

  Scenario: Can access LogIn page without logging in
    Given I navigate securely to the "LogIn"
    Then I should see that I am on the "LogIn" page

  Scenario: Cannot access Search page if not logged in
    Given I am not logged in
    And I navigate securely to the "Search"
    Then I should see that I am on the "LogIn" page

  Scenario: Cannot access Watchlist page if not logged in
    Given I am not logged in
    And I navigate securely to the "Watchlist"
    Then I should see that I am on the "LogIn" page

  Scenario: Cannot access Watchlist page if not logged in
    Given I am not logged in
    And I navigate securely to the "WatchlistDetail"
    Then I should see that I am on the "LogIn" page

  # logout on all pages

  Scenario: Can logout of Search page
    Given I am logged in
    And I navigate securely to the "Search"
    And I logout
    Then I should see that I am on the "LogIn" page

  Scenario: Can logout of Watchlist page
    Given I am logged in
    And I navigate securely to the "Watchlist"
    And I logout
    Then I should see that I am on the "LogIn" page

  Scenario: Can logout of WatchlistDetail page
    Given I am logged in
    And I navigate securely to the "WatchlistDetail"
    And I logout
    Then I should see that I am on the "LogIn" page

  # session timeout on all pages
  Scenario: Logs out user and returns to login page after 60 seconds of inactivity on Search page
    Given I am logged in
    And I navigate securely to the "Search"
    And I am inactive for 60 seconds
    Then I should see that I am on the "LogIn" page

  Scenario: Logs out user and returns to login page after 60 seconds of inactivity on Watchlist page
    Given I am logged in
    And I navigate securely to the "Watchlist"
    And I am inactive for 60 seconds
    Then I should see that I am on the "LogIn" page

  Scenario: Logs out user and returns to login page after 60 seconds of inactivity on WatchlistDetail page
    Given I am logged in
    And I navigate securely to the "WatchlistDetail"
    And I am inactive for 60 seconds
    Then I should see that I am on the "LogIn" page

  # account lockout after 3 unsuccessful attempts
  Scenario: Account is locked after 3 failed attempts to login in 1 minute
    Given I am not logged in
    And I navigate securely to the "LogIn"
#    When I enter "rob" and the "fail1"
#    And I press the submit button
#    When I enter "rob" and the "fail2"
#    And I press the submit button
#    When I enter "rob" and the "fail3"








#
#  Scenario: User is able to log-out on watch list details page
#    Given I am logged in
#    When I navigate to the watch list details page
#    Then I should see a button that allows me to log out
#    When I click the log-out button
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: User is able to log-out on other page
#    Given I am logged in
#    When I navigate to the other page
#    Then I should see a button that allows me to log out
#    When I click the log-out button
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: User is able to log-out on the test montage button page
#    Given I am logged in
#    When I navigate to the test montage button page
#    Then I should see a button that allows me to log out
#    When I click the log-out button
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on home page for 60 seconds
#    Given I am logged in
#    When I navigate to the home page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on montage page for 60 seconds
#    When I navigate to the montage page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on other page
#    When I navigate to the other page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on search page
#    When I navigate to the search page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on movie details page
#    When I navigate to the movie details page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on test montage button page
#    When I navigate to the test montage button page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on watchlist page
#    When I navigate to the watchlist page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Session timeouts on watch list details page
#    When I navigate to the watch list details page
#    And I am inactive for 60 seconds
#    Then I am logged out
#    And I am returned to the log-in screen
#
#  Scenario: Account is locked after three consecutive failed logins but unlocks after 30 seconds of no attempts
#    Given I am on the log-in page
#    And I have failed to login three times in a row
#    When I enter incorrect credentials
#    Then My account should be locked
#    When I wait 30 seconds
#    Then My account should not be locked
#
#  Scenario: Account is not locked with less than three consecutive failed logins
#    Given I am on the log-in page
#    When I enter incorrect credentials
#    Then My account should not be locked
#    When I enter incorrect credentials
#    Then My account should not be locked
#    When I enter incorrect credentials
#    Then My account should be locked
#    When I wait 30 seconds
#    Then My account should not be locked

