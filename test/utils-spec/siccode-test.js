import industryCodeDescription from '../../src/utils/siccode';

describe("Sic Code conversion test suite", () => {
  it("gets a Sic Code description from a valid Sic code", () => {
    const description = 'Growing of cereals (except rice), leguminous crops and oil seeds'; 
    const conversion = industryCodeDescription['01110'];
    expect(conversion).toBe(description);
  });

  it("returns undefined for a Sic code that doesn't exist", () => {
    const conversion = industryCodeDescription['1234567890'];
    expect(conversion).toBe(undefined);
  });
});