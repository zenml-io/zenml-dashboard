// import { apiCall } from './apiCallUtils';

export const tableColumnsSorting = (columnName) => {
  // Use the custom command to wait for the loader to disappear
  cy.waitForLoaderToDisappear();
  cy.checkTableAndH4Visibility('Nothing to see here');
  // Click on the column header to sort ascending
  cy.get(`th[data-column="${columnName}"]`).click();
  cy.waitForLoaderToDisappear();
  // cy.wait(3000);
  // Optionally, you can check if the table is sorted correctly
  cy.get('tbody tr').each(($row, index, $list) => {
    // Use the custom command to wait for the loader to disappear
    cy.waitForLoaderToDisappear();
    // Extract the value of the column you are sorting by for each row
    const currentRowValueText = $row
      .find(`td[data-column="${columnName}"]`)
      .text()
      .trim();

    // Parse the current row's value as an integer (or NaN if it's not a valid integer)
    const currentRowValue = parseInt(currentRowValueText);

    if (!isNaN(currentRowValue) && index > 0) {
      // Compare the current row's value with the previous row's value
      const previousRowValueText = $list
        .eq(index - 1)
        .find(`td[data-column="${columnName}"]`)
        .text()
        .trim();

      const previousRowValue = parseInt(previousRowValueText);

      expect(currentRowValue).to.be.at.least(previousRowValue);
    }
  });
};
