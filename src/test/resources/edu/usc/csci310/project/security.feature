Feature: Be secure and protect user data

  Scenario: Home page is secure
    Given I am logged in
    When I navigate to the home page
    Then it should start with "https://"

  Scenario: Log-in page is secure
    Given I am not logged in
    When I navigate to the log-in page
    Then it should start with "https://"

  Scenario: Sign-up page is secure
    Given I am not logged in
    When I navigate to the sign-up page
    Then it should start with "https://"

  Scenario: Montage page is secure
    Given I am logged in
    When I navigate to the montage page
    Then it should start with "https://"

  Scenario: Other page is secure
    Given I am logged in
    When I navigate to the other page
    Then it should start with "https://"

  Scenario: Search page is secure
    Given I am logged in
    When I navigate to the search page
    Then it should start with "https://"

  Scenario: Movie Details page is secure
    Given I am logged in
    When I navigate to the movie details page
    Then it should start with "https://"

  Scenario: Test montage button page is secure
    Given I am logged in
    When I navigate to the Movie Details page
    Then it should start with "https://"

  Scenario: Watchlist page is secure
    Given I am logged in
    When I navigate to the watchlist page
    Then it should start with "https://"

  Scenario: Watchlist Detail page is secure
    Given I am logged in
    When I navigate to the watchlist details page
    Then it should start with "https://"

  Scenario: Not logged-in user has access to log-in
    Given I am not logged in
    Then I should have access to the log-in page

  Scenario: Not logged-in user has access to sign up page
    Given I am not logged in
    Then I should have access to the sign up page

  Scenario: Not logged-in user does not have access to non user-authentication pages
    Given I am not logged in
    Then I should not be able to access pages that are not log-in or sign-up

  Scenario: User is able to log-out on search page
    Given I am logged in
    When I navigate to the search page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on montage page
    Given I am logged in
    When I navigate to the montage page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on home page
    Given I am logged in
    When I navigate to the home page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on watchlist page
    Given I am logged in
    When I navigate to the watchlist page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on movie details page
    Given I am logged in
    When I navigate to the movie details page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on watch list details page
    Given I am logged in
    When I navigate to the watch list details page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on other page
    Given I am logged in
    When I navigate to the other page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: User is able to log-out on the test montage button page
    Given I am logged in
    When I navigate to the test montage button page
    Then I should see a button that allows me to log out
    When I click the log-out button
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on home page for 60 seconds
    Given I am logged in
    When I navigate to the home page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on montage page for 60 seconds
    When I navigate to the montage page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on other page
    When I navigate to the other page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on search page
    When I navigate to the search page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on movie details page
    When I navigate to the movie details page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on test montage button page
    When I navigate to the test montage button page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on watchlist page
    When I navigate to the watchlist page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Session timeouts on watch list details page
    When I navigate to the watch list details page
    And I am inactive for 60 seconds
    Then I am logged out
    And I am returned to the log-in screen

  Scenario: Account is locked after three consecutive failed logins but unlocks after 30 seconds of no attempts
    Given I am on the log-in page
    And I have failed to login three times in a row
    When I enter incorrect credentials
    Then My account should be locked
    When I wait 30 seconds
    Then My account should not be locked

  Scenario: Account is not locked with less than three consecutive failed logins
    Given I am on the log-in page
    When I enter incorrect credentials
    Then My account should not be locked
    When I enter incorrect credentials
    Then My account should not be locked
    When I enter incorrect credentials
    Then My account should be locked
    When I wait 30 seconds
    Then My account should not be locked

