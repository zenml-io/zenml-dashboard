export const filterByString = (columnName, emptyText) => {
  cy.waitForLoaderToDisappear();
  cy.get('[data-testid="filter-icon"]').click();

  cy.get('[data-testid="column-name-dropdown"]').select(columnName);
  cy.wait(500);
  cy.get('[data-testid="category-dropdown"]').select('Contains');
  cy.get('[data-testid="filter-value-input"]').type('random value');
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility(emptyText);
  cy.get('[data-testid="filter-value-input"]').clear();
  cy.waitForLoaderToDisappear();
  // Apply filters as needed
  cy.get('[data-testid="column-name-dropdown"]').select(columnName);
  cy.get('[data-testid="category-dropdown"]').select('Contains');
  cy.wait(500);
  cy.get('[data-testid="filter-value-input"]').type('f');
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility(emptyText);
  // Check for the h4 element with the error message

  cy.get('[data-testid="filter-value-input"]').clear();
  cy.waitForLoaderToDisappear();

  cy.get('[data-testid="category-dropdown"]').select('Start With');
  cy.wait(500);
  cy.get('[data-testid="filter-value-input"]').type('e');
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility(emptyText);
  cy.get('[data-testid="filter-value-input"]').clear();
  cy.waitForLoaderToDisappear();

  cy.get('[data-testid="category-dropdown"]').select('End With');
  cy.wait(500);
  cy.get('[data-testid="filter-value-input"]').type('f');
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility(emptyText);
  cy.get('[data-testid="filter-value-input"]').clear();
  cy.waitForLoaderToDisappear();
  if (columnName !== 'ID' && columnName !== 'Run ID') {
    cy.get('[data-testid="category-dropdown"]').select('Equal');
    cy.wait(500);
    cy.get('[data-testid="filter-value-input"]').type('1');
    cy.waitForLoaderToDisappear();
    cy.checkTableAndH4Visibility(emptyText);
    cy.get('[data-testid="filter-value-input"]').clear();
    cy.waitForLoaderToDisappear();
  }
  cy.get('[data-testid="filter-icon"]').click();
};

// Cypress.Commands.add('checkTableAndH4Visibility', (emptyText) => {
//   cy.get('table, h4').then(($elements) => {
//     cy.wait(500);
//     // At least one of the elements should be visible
//     expect($elements.filter(':visible')).to.have.length.above(0);
//     if ($elements.filter('h4:visible').length > 0) {
//       cy.get('h4').should('contain', emptyText);
//     }
//   });
// });
