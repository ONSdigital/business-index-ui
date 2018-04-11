import { FORMING_CSV, FORMING_JSON, SET_CSV_ERROR_MESSAGE, SET_JSON_ERROR_MESSAGE } from '../constants/ExportConstants';
import config from '../config/export';

const { FILE_NAME } = config;

const setForming = (type, sending) => ({ type, sending });
const setErrorMessage = (type, message) => ({ type, message });

/**
 * @const exportCSV - Export CSV
 */
export const exportCSV = (results) => (dispatch) => {
  dispatch(setForming(FORMING_CSV, true));
  dispatch(setErrorMessage(SET_CSV_ERROR_MESSAGE, ''));
  const header = 'UBRN,Business Name,PostCode,Industry Code,Legal Status,Trading Status,Turnover,Employment,Company Reference Number';

  downloadCSV(header, results).then(csv => {
    const uri = `data:text/csv;charset=utf-8,${escape(csv)}`;
    const link = document.createElement('a');
    link.href = uri;
    link.download = `${FILE_NAME}.csv`;
    dispatch(setForming(FORMING_CSV, false));
    link.click();
  }).catch(() => {
    dispatch(setErrorMessage(SET_CSV_ERROR_MESSAGE, 'Error: Unable to download CSV file.'));
  });
};

/**
 * @const exportJSON - Export JSON
 */
export const exportJSON = (results) => (dispatch) => {
  dispatch(setForming(FORMING_JSON, true));
  dispatch(setErrorMessage(SET_JSON_ERROR_MESSAGE, ''));

  downloadJSON(results).then(jsonStr => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
    const download = document.createElement('a');
    download.setAttribute('href', dataStr);
    download.setAttribute('download', `${FILE_NAME}.json`);
    dispatch(setForming(FORMING_JSON, false));
    download.click();
    download.remove();
  }).catch(() => {
    dispatch(setErrorMessage(SET_JSON_ERROR_MESSAGE, 'Error: Unable to download JSON file.'));
  });
};

const downloadCSV = (header, results) => {
  return new Promise((resolve, reject) => {
    try {
      const csv = formCSV(header, results);
      resolve(csv);
    } catch (e) {
      reject();
    }
  });
};

const downloadJSON = (results) => {
  return new Promise((resolve, reject) => {
    try {
      const jsonStr = JSON.stringify(results, null, 2);
      resolve(jsonStr);
    } catch (e) {
      reject();
    }
  });
};

/**
 * @const exportCSV - Create the CSV string
 *
 * @param  {string} header - The header to use in the CSV
 * @param  {Array} results - The results to save in a CSV file
 *
 * @return {string} A string of all the results in CSV format
 */
const formCSV = (header, results) => {
  const cols = ['id', 'businessName', 'postCode', 'industryCode', 'legalStatus', 'tradingStatus', 'turnover', 'employmentBands', 'companyNo'];
  const rows = results.map(
    leu => cols.map(
      col => ((leu[col] === undefined) ? '"",' : `"${leu[col]}",`), // Use empty string if no value present
    ).join('').concat('\r\n'), // Make into a string and add tab + newline at the end
  );
  return `${header}\r\n`.concat(rows.join(''));
};
