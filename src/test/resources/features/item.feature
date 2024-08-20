Feature: Item CRUD operations

  Scenario: Create a new item
    Given I have a new item with name "Test Item"
    When I create the item
    Then the item should be created successfully

  Scenario: Update an existing item
    Given I have an existing item with ID 1
    When I update the item with new name "Updated Item"
    Then the item should be updated successfully

  Scenario: Retrieve an item by ID
    Given I have an existing item with ID 1
    When I request the item by ID
    Then the item should be returned

  Scenario: Retrieve all items
    Given I have several items
    When I request all items
    Then all items should be retrieved successfully

  Scenario: Delete an item
    Given I have an existing item with ID 1
    When I delete the item
    Then the item should be deleted successfully
