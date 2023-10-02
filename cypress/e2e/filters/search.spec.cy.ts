import { login } from '../utils/loginUtils';
import { search } from '../utils/searchUtils';

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
    search('pipeline');
  });
});
