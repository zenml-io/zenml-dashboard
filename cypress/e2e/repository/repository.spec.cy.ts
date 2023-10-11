import { apiCall } from '../utils/apiCallUtils';

import { filterByStatus } from '../utils/filterByStatusUtils';
import { filterByString } from '../utils/filterByStringUtils';
import { login } from '../utils/loginUtils';
import { pagination } from '../utils/paginationUtils';

describe('FilterComponent E2E Tests', () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    apiCall();
    cy.get('[id="repositories"]').click();

    // Replace with your custom wait command
  });
  it('should work with valid value', () => {
    cy.get('[data-testid="search-input"]').type('repo');
    cy.get('[data-testid="repository_card"]').should('exist');
    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type('random value');
    cy.get('h4').contains('No Repositories found');
  });
  it('should apply filters where string', () => {
    // const columnList = ['ID', 'Name', '\];
    // columnList.forEach((col) => {
    //   filterByString(col);
    // });
    const filterBy = ['ID', 'Name'];

    filterBy.forEach((item) => {
      const emptyText = 'No Repositories found';
      cy.get('[data-testid="filter-icon"]').click();
      cy.get('[data-testid="column-name-dropdown"]').select(item);
      cy.get('[data-testid="category-dropdown"]').select('Contains');
      cy.get('[data-testid="filter-value-input"]').type('random value');
      cy.checkRepoCardAndH4Visibility(emptyText);
      cy.get('[data-testid="filter-value-input"]').clear();
      // Apply filters as needed
      cy.get('[data-testid="column-name-dropdown"]').select(item);
      cy.get('[data-testid="category-dropdown"]').select('Contains');
      cy.get('[data-testid="filter-value-input"]').type('12');
      cy.checkRepoCardAndH4Visibility(emptyText);
      cy.get('[data-testid="filter-value-input"]').clear();

      cy.get('[data-testid="category-dropdown"]').select('Start With');
      cy.get('[data-testid="filter-value-input"]').type('ee');
      cy.checkRepoCardAndH4Visibility(emptyText);
      cy.get('[data-testid="filter-value-input"]').clear();

      cy.get('[data-testid="category-dropdown"]').select('End With');
      cy.get('[data-testid="filter-value-input"]').type('f3');
      cy.checkRepoCardAndH4Visibility(emptyText);
      cy.get('[data-testid="filter-value-input"]').clear();

      // cy.get('[data-testid="category-dropdown"]').select('Equal');
      // cy.get('[data-testid="filter-value-input"]').type('1');
      // cy.checkRepoCardAndH4Visibility(emptyText);
      // cy.get('[data-testid="filter-value-input"]').clear();
      cy.get('[data-testid="filter-icon"]').click();
    });
  });

  it('should navigate through pagination', () => {
    // Assuming you have a button or link for next and previous pagination
    // You can click these buttons to navigate through pages
    pagination(); // Click the "Previous" button
    // Add more assertions as needed
  });

  it("should display respository's runs", () => {
    // cy.wait(5000);
    cy.waitForLoaderToDisappear();
    //   cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('[data-testid="repository_card"]')
      .first() // Select the first element with the data-testid
      .children() // Get the child elements
      .first() // Select the first child element
      .click({ force: true });
    cy.get('[data-testid="run_tab"]').click();
    cy.waitForLoaderToDisappear();
    // cy.get('table').should('exist');
    const columnList = ['Run ID', 'Run Name'];
    const emptyText = 'No runs';
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
    filterByStatus();
  });
});
