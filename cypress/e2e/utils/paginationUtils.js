import { apiCall } from './apiCallUtils';
export const pagination = () => {
  cy.get('[data-testid="next-page"]').click();
  apiCall();
  // Click the "Next" button
  cy.get('[data-testid="prev-page"]').click();
  apiCall();

  cy.get('[data-testid="last-page"]').click();
  apiCall();

  cy.get('[data-testid="first-page"]').click();

  // You
};
