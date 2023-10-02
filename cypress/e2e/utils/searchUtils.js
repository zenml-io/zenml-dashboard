export const search = (value) => {
  cy.get('[data-testid="search-input"]').type(value);
  cy.get('table').should('be.visible');
  cy.get('table tr td').contains(value);
  cy.get('[data-testid="search-input"]').clear();
  cy.get('[data-testid="search-input"]').type('random value');
  cy.get('h4').contains(
    'We are sorry! We could not find anything for your filter set. Please change your filters and try again.',
  );
};
