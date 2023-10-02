import { login } from '../utils/loginUtils';

describe('FilterComponent E2E Tests', () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    cy.wait(500);
    cy.get('[id="stack"]').click(); // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    // cy.wait(9000);

    cy.get('table')
      .should('be.visible')
      .then(($table) => {
        if ($table.length > 0) {
          // The table is visible, so check the table headers
          cy.get('table thead th')
            .should('have.length', 5)
            .should('contain', 'ID')
            .should('contain', 'NAME')
            .should('contain', 'SHARED')
            .should('contain', 'AUTHOR')
            .should('contain', 'CREATED AT');
        } else {
          // The table is not visible, so check the 'Nothing to see here' message
          cy.get('h4').contains(
            'Nothing to see here, it seems like no stack has been configured yet. Click here to register new one.',
          );
        }
      });
    //   .should('contain', 'Age')
    //   .should('contain', 'Country');
  });

  //   it('should contain the expected data', () => {
  //     // Check if the table body contains the expected data
  //     cy.get('table tbody tr')
  //       .should('have.length.gt', 0) // Make sure there are rows
  //       .each(($row, index) => {
  //         cy.wrap($row)
  //           .find('td')
  //           .should('have.length', 3) // Make sure each row has three columns
  //           .eq(0)
  //           .should(
  //             'contain',
  //             'ExpectedName' /* Replace with your expected name */,
  //           )
  //           .next()
  //           .should('contain', 'ExpectedAge' /* Replace with your expected age */)
  //           .next()
  //           .should(
  //             'contain',
  //             'ExpectedCountry' /* Replace with your expected country */,
  //           );
  //       });
  //   });

  //   it('should sort columns correctly', () => {
  //     // Click on the column header to trigger sorting
  //     cy.get('#myTable thead th').contains('Name').click();

  //     // Check if the table rows are sorted correctly based on the 'Name' column
  //     cy.get('#myTable tbody tr')
  //       .should('have.length.gt', 0) // Make sure there are rows
  //       .each(($row, index) => {
  //         // Verify the order of rows based on the 'Name' column
  //         // Replace 'ExpectedName1', 'ExpectedName2', etc., with expected sorting order
  //         if (index === 0) {
  //           cy.wrap($row).should('contain', 'ExpectedName1');
  //         } else if (index === 1) {
  //           cy.wrap($row).should('contain', 'ExpectedName2');
  //         }
  //         // Continue for other expected names
  //       });
  //   });
});
