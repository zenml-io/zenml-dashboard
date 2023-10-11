export const dag = () => {
  cy.get('[data-testid="display-dag"]').should('be.visible');
  cy.get('.react-flow__node').should('be.visible'); // Replace with the selector for nodes
  cy.get('.react-flow__edge').should('be.visible');
  cy.wait(500);

  cy.get('.react-flow__node:first').click();
};
