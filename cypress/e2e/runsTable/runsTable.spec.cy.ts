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
    cy.get('[id="runs"]').click();
    // cy.wait(2000); // Replace with your custom wait command
  });

  it('should display the correct columns', () => {
    // cy.wait(9000);
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
      tableColumnsSorting(col);
    });
  });

  it('should work with valid value', () => {
    search('pipeline');
  });

  it('should apply filters where string', () => {
    const columnList = ['ID', 'Name'];
    columnList.forEach((col) => {
      filterByString(col);
    });
  });
});
