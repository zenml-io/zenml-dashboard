export const filterById = (columnName) => {
  cy.get('[data-testid="filter-icon"]').click();
  cy.get('[data-testid="column-name-dropdown"]').select(columnName);
  cy.get('[data-testid="category-dropdown"]').select('Contains');
  cy.get('[data-testid="filter-value-input"]').type('random value');
  cy.get('h4').contains(
    'We are sorry! We could not find anything for your filter set. Please change your filters and try again.',
  );
  cy.get('[data-testid="filter-value-input"]').clear();
  // Apply filters as needed
  cy.get('[data-testid="column-name-dropdown"]').select(columnName);
  cy.get('[data-testid="category-dropdown"]').select('Contains');
  cy.get('[data-testid="filter-value-input"]').type('12');
  cy.get('table').should('be.visible');
  cy.get('[data-testid="filter-value-input"]').clear();

  cy.get('[data-testid="category-dropdown"]').select('Start With');
  cy.get('[data-testid="filter-value-input"]').type('ee');
  cy.get('table').should('be.visible');
  cy.get('[data-testid="filter-value-input"]').clear();

  cy.get('[data-testid="category-dropdown"]').select('End With');
  cy.get('[data-testid="filter-value-input"]').type('f3');
  cy.get('table').should('be.visible');
  cy.get('[data-testid="filter-value-input"]').clear();
};
