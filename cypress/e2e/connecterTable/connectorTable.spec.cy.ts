import { filterByBoolean } from '../utils/filterByBooleanUtils';
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
      'Shared',
    ];
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = [
      'Id',
      'Name',
      'connector_type',
      'resource_types',
      'resource_id',
      'Authentication',
      'Author',
      'created_at',
      'Shared',
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
    const columnList = [
      'ID',
      'Name',
      'Connector Type',
      'Resource Types',
      'Resource ID',
      'Authentication',
    ];
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
});
