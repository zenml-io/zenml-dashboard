import { login } from '../loginUtils';

describe('FilterComponent E2E Tests', () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    cy.get('[id="pipelines"]').click(); // Replace with your custom wait command
  });

  it('should apply filters where Id', () => {
    // Visit the page containing the FilterComponent
    // Click the filter icon to open the filter panel
    cy.get('[data-testid="filter-icon"]').click();
    cy.get('[data-testid="column-name-dropdown"]').select('ID');
    cy.get('[data-testid="category-dropdown"]').select('Contains');
    cy.get('[data-testid="filter-value-input"]').type('random value');
    cy.get('h4').contains(
      'We are sorry! We could not find anything for your filter set. Please change your filters and try again.',
    );
    cy.get('[data-testid="filter-value-input"]').clear();
    // Apply filters as needed
    cy.get('[data-testid="column-name-dropdown"]').select('ID');
    cy.get('[data-testid="category-dropdown"]').select('Contains');
    cy.get('[data-testid="filter-value-input"]').type('12');
    cy.get('table').should('be.visible');
    cy.get('[data-testid="filter-value-input"]').clear();

    cy.get('[data-testid="category-dropdown"]').select('Start With');
    cy.get('[data-testid="filter-value-input"]').type('ee');
    cy.get('table').should('be.visible');

    // cy.get('[data-testid="column-name-dropdown"]').select('Author');
    // cy.get('[data-testid="disabled-equals"]').should('be.disabled');
    // cy.get('[data-testid="author-dropdown"] input').type('zenml');
    // cy.get('[data-testid="author-dropdown"]').contains('zenml').click();
    // cy.get('[data-testid="author-dropdown"] div').contains('zenml').click();
    // cy.get('[id="react-select-2-listbox"]').contains('zenml').click();
    // cy.contains('zenml').click();
    // cy.get('table').should('be.visible');
    // cy.get('[data-testid="filter-value-input"]').clear();

    // cy.get('[data-testid="filter-value-input"]').clear();
  });
  // it('should apply filters where name', () => {
  //   // Visit the page containing the FilterComponent
  //   // Click the filter icon to open the filter panel
  //   cy.get('[data-testid="filter-icon"]').click();

  //   // Apply filters as needed
  //   cy.get('[data-testid="column-name-dropdown"]').select('Name');
  //   cy.get('[data-testid="category-dropdown"]').select('Contains');
  //   cy.get('[data-testid="filter-value-input"]').type('pipeline');
  //   cy.get('table').should('be.visible');
  //   cy.get('[data-testid="filter-value-input"]').clear();
  //   cy.get('[data-testid="filter-value-input"]').type('random value');
  //   cy.get('h4').contains(
  //     'We are sorry! We could not find anything for your filter set. Please change your filters and try again.',
  //   );
  // });
});
