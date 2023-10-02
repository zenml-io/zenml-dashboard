import { login } from '../loginUtils';

describe('FilterComponent E2E Tests', () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    cy.get('[id="pipelines"]').click(); // Replace with your custom wait command
  });

  it('Should display and interact with the FilterComponent on the search', () => {
    cy.get('[data-testid="filter-component"]').should('be.visible');
  });

  it('should work with valid value', () => {
    cy.get('[data-testid="search-input"]').type('pipeline');
    cy.get('table').should('be.visible');
    cy.get('[data-testid="search-input"]').clear();
    cy.get('[data-testid="search-input"]').type('random value');
    cy.get('h4').contains(
      'We are sorry! We could not find anything for your filter set. Please change your filters and try again.',
    );
  });
});
