export const pagination = () => {
  cy.get('[data-testid="next-page"]').click();
  cy.wait(1000); // Click the "Next" button
  cy.get('[data-testid="prev-page"]').click();
  cy.wait(1000);
  cy.get('[data-testid="last-page"]').click();
  cy.wait(1000);
  cy.get('[data-testid="first-page"]').click();

  // You
};
