import { filterByBoolean } from '../utils/filterByBooleanUtils';
import { filterByStatus } from '../utils/filterByStatusUtils';
import { filterByString } from '../utils/filterByStringUtils';
import { login } from '../utils/loginUtils';
import { pagination } from '../utils/paginationUtils';
import { search } from '../utils/searchUtils';
import { tableColumnsSorting } from '../utils/tableColumnSortingUtils';
import { tableColumns } from '../utils/tableColumnUtils';

describe('FilterComponent E2E Tests', () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    cy.wait(500);
    cy.get('[id="stack-component"]').click(); // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    // cy.wait(9000);
    const emptyText = 'Nothing to see here';
    const columnList = [
      'ID',
      'NAME',
      'FLAVOR',
      'SHARED',
      'AUTHOR',
      'CREATED AT',
    ];
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = [
      'Id',
      'Name',
      'Flavor',
      'Shared',
      'Author',
      'created_at',
    ];
    columnTestIds.forEach((col) => {
      tableColumnsSorting(col);
      // cy.wait(2000);
    });
  });

  it('should work with valid value', () => {
    search('asd2');
  });

  it('should apply filters where string', () => {
    const columnList = ['ID', 'Name', 'Flavor'];
    columnList.forEach((col) => {
      filterByString(col);
    });
    filterByBoolean();
  });
  it('should navigate through pagination', () => {
    // Assuming you have a button or link for next and previous pagination
    // You can click these buttons to navigate through pages
    pagination(); // Click the "Previous" button
    // Add more assertions as needed
  });
  it.only("should display component's stack", () => {
    // cy.wait(5000);
    cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('table tbody tr:eq(4)').click({ force: true });

    cy.get('[data-testid="stack_tab"]').click();
    cy.get('table').should('exist');

    cy.get('table').should('exist');
    const columnList = ['ID', 'Name'];
    const emptyText = 'No runs';
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
    filterByStatus();
  });
});
