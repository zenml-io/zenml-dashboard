export const search = (value, emptyText) => {
  cy.get('[data-testid="search-input"]').type(value);

  cy.waitForLoaderToDisappear();

  cy.checkTableAndH4Visibility(emptyText);

  // cy.get('table tr td').contains(value);
  cy.get('[data-testid="search-input"]').clear();
  cy.get('[data-testid="search-input"]').type('random value');
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility(emptyText);
};
