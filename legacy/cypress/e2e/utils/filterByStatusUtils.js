export const filterByStatus = (emptyText) => {
  cy.get('[data-testid="filter-icon"]').click();
  cy.get('[data-testid="column-name-dropdown"]').select('Status');
  cy.get('[data-testid="status-options"]').select('Completed');
  cy.waitForLoaderToDisappear();
  if (emptyText) {
    cy.checkTableAndH4Visibility(emptyText);
  } else {
    cy.checkTableAndH4Visibility('We are sorry');
  }
};
