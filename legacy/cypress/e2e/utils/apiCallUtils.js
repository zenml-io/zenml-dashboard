export const apiCall = () => {
  cy.intercept('**/*').as('allRequests');
  cy.wait('@allRequests', { timeout: 20000 }).then((interceptions) => {
    // Check if there are any pending requests
    // cy.log('There are pending API requests:', interceptions);
    // if (interceptions.length > 0) {
    //   // You can log or perform other actions here if there are pending requests
    //   cy.log('There are pending API requests:', interceptions);
    // } else {
    //   // No pending requests, continue with your test
    //   cy.log('No pending API requests');
    // }
  });
};
