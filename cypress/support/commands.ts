/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add('waitUntilDashboardIsLoaded' as any, () => {
  cy.get('[data-testid="dashboard-element"]').should('be.visible'); // Replace with the actual selector of an element on your dashboard
});

Cypress.Commands.add('checkTableAndH4Visibility' as any, (emptyText) => {
  cy.get('table, h4').then(($elements) => {
    cy.wait(500);
    // At least one of the elements should be visible
    expect($elements.filter(':visible')).to.have.length.above(0);
    if ($elements.filter('h4:visible').length > 0) {
      cy.get('h4').should('contain', emptyText);
    }
  });
});

Cypress.Commands.add('checkTableAndClickRow' as any, (emptyText) => {
  cy.get('table, h4').then(($elements) => {
    cy.wait(500);
    // At least one of the elements should be visible
    expect($elements.filter(':visible')).to.have.length.above(0);
    if ($elements.filter('table:visible').length > 0) {
      cy.get('table tbody tr:first').click({ force: true });
    }
  });
});

Cypress.Commands.add('checkRepoCardAndH4Visibility' as any, (emptyText) => {
  cy.get('[data-testid="repository_card"], h4').then(($elements) => {
    cy.wait(500);
    // At least one of the elements should be visible
    expect($elements.filter(':visible')).to.have.length.above(0);
    if ($elements.filter('h4:visible').length > 0) {
      cy.get('h4').should('contain', emptyText);
    }
  });
});

Cypress.Commands.add('waitForLoaderToDisappear' as any, () => {
  // Wait for the loader to disappear
  cy.get('[data-testid="loader"]', { timeout: 20000 }).should('not.exist');
});

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
