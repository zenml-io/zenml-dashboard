// import { filterByBoolean } from '../utils/filterByBooleanUtils';
import { filterByString } from '../utils/filterByStringUtils';
import { login } from '../utils/loginUtils';
import { pagination } from '../utils/paginationUtils';
import { search } from '../utils/searchUtils';
import { tableColumnsSorting } from '../utils/tableColumnSortingUtils';
import { tableColumns } from '../utils/tableColumnUtils';

describe("Connector's Table E2E Tests", () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    cy.wait(1000);
    cy.get('[id="connector"]').click(); // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    const emptyText =
      'Nothing to see here, it seems like no stack has been configured yet.';
    const columnList = [
      'ID',
      'NAME',
      'Connector Type',
      'Resource Types',
      'Resource ID',
      'Authentication',
      'Author',
      'Created',
      // 'Shared',
    ];
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = [
      'Id',
      'Name',
      'connector_type',
      // 'resource_types',
      'resource_id',
      'Authentication',
      'Author',
      'created_at',
      // 'Shared',
    ];
    columnTestIds.forEach((col) => {
      tableColumnsSorting(col);
      // cy.wait(2000);
    });
  });

  it('should work with valid value', () => {
    cy.waitForLoaderToDisappear();
    const emptyText = 'We are sorry';
    search('a', emptyText);
  });

  it('should apply filters where string', () => {
    const emptyText = 'We are sorry';
    const columnList = [
      'ID',
      'Name',
      'Connector Type',
      'Resource Type',
      'Resource ID',
      'Authentication',
    ];
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
    // filterByBoolean(emptyText);
  });
  it('should navigate through pagination', () => {
    cy.waitForLoaderToDisappear();
    // Assuming you have a button or link for next and previous pagination
    // You can click these buttons to navigate through pages
    pagination(); // Click the "Previous" button
    // Add more assertions as needed
  });
  it("should display connector's component", () => {
    // cy.wait(5000);
    cy.waitForLoaderToDisappear();
    cy.get('table').should('exist');

    // Select the first row within the table (modify the selector as needed)
    cy.get('table tbody tr:eq(0)').click({ force: true });

    cy.get('[data-testid="component_tab"]').click();
    // cy.get('table').should('exist');
    cy.waitForLoaderToDisappear();

    // cy.get('table').should('exist');
    const columnList = ['ID', 'Name', 'Flavor'];
    const emptyText = 'No components';
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
    // filterByBoolean(emptyText);
  });
});
