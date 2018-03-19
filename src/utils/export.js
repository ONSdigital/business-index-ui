import config from '../config/export';

const { FILE_NAME } = config;

/**
 * @function exportCSV
 *
 * @param  {string} header - The header to use in the CSV
 * @param  {Array} results - The results to save in a CSV file
 *
 * @return {string} A string of all the results in CSV format
 */
export function exportCSV(header, results) {
  const cols = ['id', 'businessName', 'postCode', 'industryCode', 'legalStatus', 'tradingStatus', 'turnover', 'employmentBands', 'companyNo'];
  const rows = results.map(
    leu => cols.map(
      col => ((leu[col] === undefined) ? '"",' : `"${leu[col]}",`), // Use empty string if no value present
    ).join('').concat('\r\n'), // Make into a string and add tab + newline at the end
  );
  return `${header}\r\n`.concat(rows.join(''));
}

/**
 * @function downloadCSV
 *
 * @param  {Array} results - The results to save in a CSV file
 */
export function downloadCSV(results) {
  const header = 'UBRN,Business Name,PostCode,Industry Code,Legal Status,Trading Status,Turnover,Employment,Company Reference Number';
  const csv = exportCSV(header, results);
  const uri = `data:text/csv;charset=utf-8,${escape(csv)}`;
  const link = document.createElement('a');
  link.href = uri;
  link.download = `${FILE_NAME}.csv`;
  link.click();
}

/**
 * @function downloadJSON
 *
 * @param  {Array} results - The results to save in a JSON file
 */
export function downloadJSON(results) {
  const jsonStr = JSON.stringify(results.slice(0, 10), null, 2);
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(jsonStr)}`;
  const download = document.createElement('a');
  download.setAttribute('href', dataStr);
  download.setAttribute('download', `${FILE_NAME}.json`);
  download.click();
  download.remove();
}
