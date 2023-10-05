import { apiCall } from '../utils/apiCallUtils';
import { dag } from '../utils/dagUtils';
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
    apiCall();
    cy.get('[id="pipelines"]').click();

    // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    const emptyText =
      'Nothing to see here, it seems like no pipeline has been configured yet.';
    const columnList = [
      'ID',
      'NAME',
      'STATUS',
      'VERSION',
      'AUTHOR',
      'CREATED AT',
    ];
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = [
      'Id',
      'Name',
      'Status',
      'Version',
      'Author',
      'created_at',
    ];
    columnTestIds.forEach((col) => {
      tableColumnsSorting(col);
    });
  });

  it('should work with valid value', () => {
    search('pipeline');
  });

  it('should apply filters where string', () => {
    const columnList = ['ID', 'Name', 'Version'];
    columnList.forEach((col) => {
      filterByString(col);
    });
  });

  it('should navigate through pagination', () => {
    // Assuming you have a button or link for next and previous pagination
    // You can click these buttons to navigate through pages
    pagination(); // Click the "Previous" button
    // Add more assertions as needed
  });

  it('should display pipelineDetails', () => {
    // cy.wait(5000);
    cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('table tbody tr:first').should('exist');

    // Click on the first row
    cy.get('table tbody tr:first').click({ force: true });
    cy.wait(5000);
    cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('table:eq(1) tbody tr:first').should('exist');

    // Click on the first row
    cy.get('table:eq(1) tbody tr:first').click({ force: true });
    dag();
  });
  it.only("should display pipeline's runs", () => {
    // cy.wait(5000);
    cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('table tbody tr:first').click({ force: true });

    cy.get('table').should('exist');
    const columnList = ['Run ID', 'Run Name'];
    const emptyText = 'No runs';
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
    filterByStatus();
  });
});
