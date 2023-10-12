// import { apiCall } from '../utils/apiCallUtils';
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
    cy.wait(1000);
    // apiCall();
    cy.get('[id="runs"]').click();
  });

  it('should display the correct columns', () => {
    const emptyText =
      'Nothing to see here, it seems like no run has been configured yet.';
    const columnList = [
      'RUN ID',
      'RUN NAME',
      'PIPELINE',
      'STATUS',
      'STACK NAME',
      'AUTHOR',
      'CREATED AT',
    ];
    cy.wait(5000);
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = [
      'Id',
      'Name',
      'Pipeline',
      'Status',
      'stack_name',
      'Author',
      'created_at',
    ];
    columnTestIds.forEach((col) => {
      // apiCall();
      tableColumnsSorting(col);
    });
  });

  it('should work with valid value', () => {
    const emptyText = 'We are sorry';
    search('pipeline', emptyText);
  });

  it('should apply filters where string', () => {
    const columnList = ['Run ID', 'Run Name'];
    const emptyText = 'We are sorry';
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
    filterByStatus();
  });
  it('should navigate through pagination', () => {
    cy.waitForLoaderToDisappear();
    // Assuming you have a button or link for next and previous pagination
    // You can click these buttons to navigate through pages
    pagination(); // Click the "Previous" button
    // Add more assertions as needed
  });

  it.only('should display runDetail', () => {
    cy.waitForLoaderToDisappear();
    cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('table tbody tr:first').should('exist');

    // Click on the first row
    cy.get('table tbody tr:first').click({ force: true });
    cy.waitForLoaderToDisappear();
    dag();
  });
});
