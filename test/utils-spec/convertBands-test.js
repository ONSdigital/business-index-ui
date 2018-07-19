import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from '../../src/utils/convertBands';

describe("Convert bands test suite", () => {
  it("converts an Employment Band to a number", () => {
    const conversion = employmentBands['A'];
    expect(conversion).toBe('0');
  });

  it("converts a Legal Status Band to a string", () => {
    const conversion = legalStatusBands['8'];
    expect(conversion).toBe('Charity');
  });

  it("converts a Trading Status Band to a string", () => {
    const conversion = tradingStatusBands['A'];
    expect(conversion).toBe('Active');
  });

  it("converts a Turnover Band to a string", () => {
    const conversion = turnoverBands['A'];
    expect(conversion).toBe('0-99');
  });
});