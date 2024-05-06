// import { apiCall } from './apiCallUtils';
export const pagination = () => {
  cy.waitForLoaderToDisappear();

  cy.get('body').then((body) => {
    const button = body.find('[data-testid="next-page"]');

    if (button.length && button.is(':visible')) {
      button.click();
    } else {
      // Do nothing if the element is not found or is hidden
    }
  });

  cy.waitForLoaderToDisappear();
  // apiCall();
  // Click the "Next" button
  cy.get('body').then((body) => {
    const button = body.find('[data-testid="prev-page"]');

    if (button.length && button.is(':visible')) {
      button.click();
    } else {
      // Do nothing if the element is not found or is hidden
    }
  });

  cy.waitForLoaderToDisappear();
  // apiCall();
  cy.get('body').then((body) => {
    const button = body.find('[data-testid="last-page"]');

    if (button.length && button.is(':visible')) {
      button.click();
    } else {
      // Do nothing if the element is not found or is hidden
    }
  });

  cy.waitForLoaderToDisappear();
  // apiCall();
  cy.get('body').then((body) => {
    const button = body.find('[data-testid="first-page"]');

    if (button.length && button.is(':visible')) {
      button.click();
    } else {
      // Do nothing if the element is not found or is hidden
    }
  });
};
