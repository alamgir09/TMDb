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
    Given I am not logged in
    And  I navigate securely to the "SignUp" without logging in
    Then I should see that I am on the "SignUp" page

  Scenario: Can access LogIn page without logging in
    Given I am not logged in
    And I navigate securely to the "LogIn" without logging in
    Then I should see that I am on the "LogIn" page

  Scenario: Cannot access Search page if not logged in
    Given I am not logged in
    And I navigate securely to the "Search" without logging in
    Then I should see that I am on the "LogIn" page

  Scenario: Cannot access Watchlist page if not logged in
    Given I am not logged in
    And I navigate securely to the "Watchlist" without logging in
    Then I should see that I am on the "LogIn" page

  Scenario: Cannot access Watchlist page if not logged in
    Given I am not logged in
    And I navigate securely to the "WatchlistDetail" without logging in
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
  Scenario: Account is not locked after user fails to login 2 times then successfully logs in on the 3rd
    Given I navigate securely to the "LogIn" without logging in
    When I enter "jas" into username and "fail1" into password
    And I submit my login credentials
    When I enter "jas" into username and "fail2" into password
    And I submit my login credentials
    When I enter "jas" into username and "jas" into password
    And I submit my login credentials
    Then I should see that I am on the "Search" page

  Scenario: Account is locked after user fails to login 3 times in 1 min
    Given I navigate securely to the "LogIn" without logging in
    When I enter "jas" into username and "fail1" into password
    And I submit my login credentials
    When I enter "jas" into username and "fail2" into password
    And I submit my login credentials
    When I enter "jas" into username and "fail3" into password
    And I submit my login credentials
    Then I should see response on the screen "Too many failed attempts. Please retry in 30 seconds..."









