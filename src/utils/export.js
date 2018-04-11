import config from '../config/export';
import { convertLegalStatus, convertTradingStatus, convertTurnover, convertEmploymentBands, pipe } from './helperMethods';

const { FILE_NAME } = config;

/**
 * @const exportCSV - Create the CSV string
 *
 * @param  {string} header - The header to use in the CSV
 * @param  {Array} results - The results to save in a CSV file
 *
 * @return {string} A string of all the results in CSV format
 */
const exportCSV = (header, results) => {
  const cols = ['id', 'businessName', 'postCode', 'industryCode', 'legalStatus', 'tradingStatus', 'turnover', 'employmentBands', 'companyNo'];
  const rows = results.map(
    leu => cols.map(
      col => ((leu[col] === undefined) ? '"",' : `"${leu[col]}",`), // Use empty string if no value present
    ).join('').concat('\r\n'), // Make into a string and add tab + newline at the end
  );
  return `${header}\r\n`.concat(rows.join(''));
};


/**
 * @const downloadCSV - Download the results as a CSV file
 *
 * @param {Array} results - The results to save in a CSV file
 */
const downloadCSV = (results) => {
  Promise.all(convertBands(results)).then(res => {
    const header = 'UBRN,Business Name,PostCode,Industry Code,Legal Status,Trading Status,Turnover,Employment,Company Reference Number';
    const csv = exportCSV(header, res);
    const uri = `data:text/csv;charset=utf-8,${escape(csv)}`;
    const link = document.createElement('a');
    link.href = uri;
    link.download = `${FILE_NAME}.csv`;
    link.click();
  });
};


/**
 * @const downloadJSON - Download the results as a JSON file
 *
 * @param {Array} results - The results to save in a JSON file
 */
const downloadJSON = (results) => {
  Promise.all(convertBands(results)).then(res => {
    // There is an issue with a.click() when the JSON string to append to the DOM
    // is too long, so we use a workaround from below.
    // https://stackoverflow.com/a/19328891
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    const json = JSON.stringify(res, null, 2);
    const blob = new Blob([json], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = `${FILE_NAME}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  });
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

export { exportCSV, downloadCSV, downloadJSON };
