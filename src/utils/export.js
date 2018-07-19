import { convertLegalStatus, convertTradingStatus, convertTurnover, convertEmploymentBands, pipe } from './helperMethods';


/**
 * @const transformBusiness - Convert the bands of each business in an array. We use
 * the pipe helper method to pipe the return value of one function into the
 * next function, so we can apply a sequence of transformations immutably.
 *
 * @param {Object} business - An array of business objects
 *
 * @return {Prmoise} - The promise which resolves to a business object with
 * transformations applied
 */
const transformBusiness = (business) => new Promise((resolve) => resolve(pipe(
  convertLegalStatus, convertTradingStatus, convertTurnover, convertEmploymentBands,
)(business)));


/**
 * @const formCSV - Create the CSV string
 *
 * @param  {string} header - The header to use in the CSV
 * @param  {Array} results - The results to save in a CSV file
 *
 * @return {string} A string of all the results in CSV format
 */
const formCSV = (header, results) => {
  const cols = ['id', 'BusinessName', 'PostCode', 'IndustryCode', 'LegalStatus', 'TradingStatus', 'Turnover', 'EmploymentBands', 'CompanyNo'];
  const rows = results.map(
    leu => cols.map(
      col => ((leu[col] === undefined) ? '"",' : `"${leu[col]}",`), // Use empty string if no value present
    ).join('').concat('\r\n'), // Make into a string and add tab + newline at the end
  );
  return `${header}\r\n`.concat(rows.join(''));
};


/**
 * @const convertBands - Convert the bands of each business in an array
 *
 * @param {Array} results - An array of business objects
 *
 * @return {Array} - The array of Promises of business objects, we use promises as
 * when converting the bands of potentially 10,000 results we don't want the
 * UI to hang
 */
const convertBands = (results) => results.map(x => transformBusiness(x));


export { formCSV, convertBands, transformBusiness };
