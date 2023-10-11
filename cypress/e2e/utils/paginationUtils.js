// import { apiCall } from './apiCallUtils';
export const pagination = () => {
  cy.waitForLoaderToDisappear();
  cy.get('[data-testid="next-page"]').click();
  cy.waitForLoaderToDisappear();
  // apiCall();
  // Click the "Next" button
  cy.get('[data-testid="prev-page"]').click();
  cy.waitForLoaderToDisappear();
  // apiCall();

  cy.get('[data-testid="last-page"]').click();
  cy.waitForLoaderToDisappear();
  // apiCall();

  cy.get('[data-testid="first-page"]').click();

  // You
};
