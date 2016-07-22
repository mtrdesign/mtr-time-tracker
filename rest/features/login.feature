Feature: Login test

  Scenario: Try to login with invalid username/password
    Given I see login form
    And I fill the form with invalid values
    And I submit the form
    Then I see the error message

  Scenario: Try to login with valid username/password
    Given I see login form
    And I fill the form with valid values
    And I submit the form
    Then I dont see the error message
