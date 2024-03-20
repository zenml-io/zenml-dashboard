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
    cy.get('[id="secrets"]').click(); // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    const emptyText =
      'Nothing to see here, it seems like no stack has been configured yet.';
    const columnList = ['SECRET ID', 'NAME', 'SCOPE', 'AUTHOR', 'CREATED AT'];
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = ['Id', 'Name', 'Scope', 'Author', 'created_at'];
    columnTestIds.forEach((col) => {
      tableColumnsSorting(col);
    });
  });

  it('should work with valid value', () => {
    const emptyText = 'We are sorry';
    search('a', emptyText);
  });

  it('should apply filters where string', () => {
    const emptyText = 'We are sorry';
    const columnList = ['ID', 'Name', 'Scope'];
    columnList.forEach((col) => {
      filterByString(col, emptyText);
    });
  });
  it('should navigate through pagination', () => {
    cy.waitForLoaderToDisappear();
    // Assuming you have a button or link for next and previous pagination
    // You can click these buttons to navigate through pages
    pagination(); // Click the "Previous" button
    // Add more assertions as needed
  });
});
