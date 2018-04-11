import { FORMING_CSV, FORMING_JSON, SET_CSV_ERROR_MESSAGE, SET_JSON_ERROR_MESSAGE } from '../constants/ExportConstants';
import { convertBands, formCSV } from '../utils/export';
import config from '../config/export';

const { FILE_NAME } = config;

const setForming = (type, sending) => ({ type, sending });
const setErrorMessage = (type, message) => ({ type, message });

/**
 * @const exportCSV - Export the search results as a CSV
 *
 * @param {Array} results - The array of business objects
 */
export const exportCSV = (results) => (dispatch) => {
  dispatch(setForming(FORMING_CSV, true));
  dispatch(setErrorMessage(SET_CSV_ERROR_MESSAGE, ''));

  setTimeout(() => {
    Promise.all(convertBands(results)).then(res => {
      const header = 'UBRN,Business Name,PostCode,Industry Code,Legal Status,Trading Status,Turnover,Employment,Company Reference Number';
      const csv = formCSV(header, res);
      const uri = `data:text/csv;charset=utf-8,${escape(csv)}`;
      const link = document.createElement('a');
      link.href = uri;
      link.download = `${FILE_NAME}.csv`;
      dispatch(setForming(FORMING_CSV, false));
      link.click();
    }).catch(() => {
      dispatch(setErrorMessage(SET_CSV_ERROR_MESSAGE, 'Error: Unable to download CSV file.'));
    });
  }, 0);
};


/**
 * @const exportJSON - Export the search results as JSON
 *
 * @param {Array} results - The array of business objects
 */
export const exportJSON = (results) => (dispatch) => {
  dispatch(setForming(FORMING_JSON, true));
  dispatch(setErrorMessage(SET_JSON_ERROR_MESSAGE, ''));

  setTimeout(() => {
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
      dispatch(setForming(FORMING_JSON, false));
      a.click();
      window.URL.revokeObjectURL(url);
    }).catch(() => {
      dispatch(setErrorMessage(SET_JSON_ERROR_MESSAGE, 'Error: Unable to download JSON file.'));
    });
  }, 0);
};
