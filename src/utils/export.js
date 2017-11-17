import config from '../config/export';

const { NAME } = config;

export function exportCSV(header, results) {
  const columnNames = ['id', 'businessName', 'postCode', 'industryCode', 'legalStatus', 'tradingStatus', 'turnover', 'employmentBands', 'companyNo'];
  let CSV = '';
  CSV += `${header}\r\n`; // Firstly, insert the header
  // Go through the results, putting them in the CSV string
  for (let i = 0; i < results.length; i += 1) {
    let row = '';
    // If there is missing data, insert an empty string
    for (let j = 0; j < columnNames.length; j += 1) {
      if (results[i][columnNames[j]] === undefined) {
        row += '"",';
      } else {
        row += `"${results[i][columnNames[j]]}",`;
      }
    }
    CSV += `${row}\r\n`;
  }
  return CSV;
}

export function downloadCSV(results) {
  const header = 'UBRN,Business Name,PostCode,Industry Code,Legal Status,Trading Status,Turnover,Employment,Company Reference Number';
  const csv = exportCSV(header, results, NAME);
  const uri = `data:text/csv;charset=utf-8,${escape(csv)}`;
  const link = document.createElement('a');
  link.href = uri;
  const filename = `${NAME}.csv`;
  link.download = filename;
  // Below append/remove child is to ensure the download button works on
  // Firefox, link.click()
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
