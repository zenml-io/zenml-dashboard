export const filterByBoolean = (emptyText) => {
  cy.get('[data-testid="filter-icon"]').click();
  cy.get('[data-testid="column-name-dropdown"]').select('Shared');
  cy.get('[data-testid="shared-option"]').select('False');
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility(emptyText);
};
