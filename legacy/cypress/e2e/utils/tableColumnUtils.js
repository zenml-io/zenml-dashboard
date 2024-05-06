export const tableColumns = (columnList, emptyText) => {
  cy.waitForLoaderToDisappear();
  cy.get('table')
    .should('be.visible')
    .then(($table) => {
      if ($table.length > 0) {
        columnList.forEach((columnName) => {
          cy.get('table thead th')
            .should('have.length', columnList.length)
            .should('contain', columnName);
        });
      } else {
        cy.get('h4').contains(emptyText);
      }
    });
};
