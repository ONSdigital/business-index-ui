import config from '../../src/config/form-query';
import { formQuery, encodeSpecialChars } from '../../src/utils/formQuery';

const { SEPERATOR, LIMIT, ES_CONCAT, END_SEPERATOR } = config;

describe("formQuery.js test suite", () => {
  it("creates a valid query given a UBRN", () => {
    const Id = '12345678';
    const correctQuery = `business/${Id}`;
    const query = formQuery({
      Id,
    });

    expect(correctQuery).toBe(query);
  });

  it("encodes the spaces in businessName", () => {
    const BusinessName = 'TESCO STORES';
    const correctlyEncoded = 'TESCO%20STORES';
    const encoded = encodeSpecialChars(BusinessName);

    expect(correctlyEncoded).toBe(encoded);
  });

  it("creates a valid query given a businessName", () => {
    const BusinessName = 'TESCO STORES';
    const correctQuery = `search/BusinessName:${encodeSpecialChars(BusinessName)}${END_SEPERATOR}${LIMIT}`;
    const query = formQuery({
      BusinessName,
    });

    expect(correctQuery).toBe(query);
  });

  it("creates a valid query given an exact industryCode", () => {
    const industryCode = '10000';
    const correctQuery = `search/IndustryCode:${industryCode}${END_SEPERATOR}${LIMIT}`;
    const query = formQuery({
      IndustryCode: {
        single: industryCode,
      },
    });

    expect(correctQuery).toBe(query);
  });

  it("creates a valid query given an industryCode range", () => {
    const min = '10000';
    const max = '20000';
    const correctQuery = `search/IndustryCode:%5B${min} TO ${max}%5D${END_SEPERATOR}${LIMIT}`;
    const query = formQuery({
      IndustryCode: {
        min,
        max,
      },
    });

    expect(correctQuery).toBe(query);
  });

  it("creates a valid query given an search for refs (CH/VAT/PATE)", () => {
    const Ref = '123456AB';
    const correctQuery = `search/CompanyNo:${Ref} OR PayeRefs:${Ref} OR VatRefs:${Ref}${END_SEPERATOR}${LIMIT}`;
    const query = formQuery({
      Ref,
    });

    expect(correctQuery).toBe(query);
  });

  it("creates a valid query given multiple search parameters", () => {
    const BusinessName = 'ASDA';
    const PostCode = 'NP10 8XG';
    const correctQuery = `search/BusinessName:${BusinessName} AND PostCode:${PostCode}${END_SEPERATOR}${LIMIT}`;
    const query = formQuery({
      BusinessName,
      PostCode,
    });

    expect(correctQuery).toBe(query);
  });
});