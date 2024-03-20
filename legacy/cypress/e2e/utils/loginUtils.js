export const login = () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type(Cypress.env('USERNAME'));
  cy.get('[data-testid="password"').type(Cypress.env('PASSWORD'));
  cy.get('[data-testid="login-button"').click();
  cy.url().should('include', '/'); // Ensure the user is redirected
};
