import { filterByString } from '../utils/filterByStringUtils';
import { login } from '../utils/loginUtils';
import { search } from '../utils/searchUtils';
import { tableColumnsSorting } from '../utils/tableColumnSortingUtils';
import { tableColumns } from '../utils/tableColumnUtils';

describe('FilterComponent E2E Tests', () => {
  beforeEach(() => {
    login();
    cy.waitUntilDashboardIsLoaded();
    cy.wait(500);
    cy.get('[id="stack"]').click(); // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    // cy.wait(9000);
    const emptyText =
      'Nothing to see here, it seems like no stack has been configured yet.';
    const columnList = ['ID', 'NAME', 'SHARED', 'AUTHOR', 'CREATED AT'];
    tableColumns(columnList, emptyText);
  });

  it('should sort table columns', () => {
    const columnTestIds = ['Id', 'Name', 'Shared', 'Author', 'created_at'];
    columnTestIds.forEach((col) => {
      tableColumnsSorting(col);
      // cy.wait(2000);
    });
  });

  it('should work with valid value', () => {
    search('asd2');
  });

  it('should apply filters where string', () => {
    const columnList = ['ID', 'Name'];
    columnList.forEach((col) => {
      filterByString(col);
    });
  });
});
