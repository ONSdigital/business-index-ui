import { exportCSV } from '../../src/utils/export';
import { returnBusiness } from '../../src/utils/requestUtils';

describe("export.js test suite", () => {
  it("creates a valid CSV string from an array of businesses", () => {
    const header = 'UBRN,Business Name,PostCode,Industry Code,Legal Status,Trading Status,Turnover,Employment,Company Reference Number';
    const results = Array.from({ length: 10 }, () => returnBusiness());
    const csv = exportCSV(header, results);
    const splitCsv = csv.split(/\r?\n/);
    const csvHeader = splitCsv[0];

    // Firstly, check the header in the CSV string is correct
    expect(csvHeader).toBe(header);

    // Remove the header and the new line at the end
    const splitCsvNoHeader = splitCsv.slice(1, splitCsv.length - 1);

    // Check that businessName is present in the data
    // We need to remove the padded double qoutes around each bit of data
    results.forEach((business, i) => {
      expect(business.businessName).toBe(splitCsvNoHeader[i].split(',')[1].replace(/['"]+/g, ''));
    });

    // Do a last check on the length to verify they are the same
    expect(results.length).toBe(splitCsvNoHeader.length);
  });
});