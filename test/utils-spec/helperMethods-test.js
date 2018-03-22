import { maxSize, formatData } from '../../src/utils/helperMethods';

describe("maxSize", () => {
  it("gets the maxSize of given arrays", () => {
    const arr1 = [1, 2, 3]; 
    const arr2 = [1];
    const largest = maxSize(arr1, arr2);
    expect(largest).toBe(arr1.length);
  });
});

describe("formatData", () => {
  it("creates the correct data format for react-table (single CH)", () => {
    const business = {
      companyNo: '123456AB',
      vatRefs: [],
      payeRefs: [],
    }; 
    const correctFormat = [{
      companyNo: '123456AB',
      vatRefs: '',
      payeRefs: '',
    }];
    const formatted = formatData(business);
    expect(JSON.stringify(correctFormat)).toBe(JSON.stringify(formatted));
  });

  it("creates the correct data format for react-table (no CH)", () => {
    const business = {
      companyNo: '',
      vatRefs: [],
      payeRefs: [],
    }; 
    const correctFormat = [{
      companyNo: '',
      vatRefs: '',
      payeRefs: '',
    }];
    const formatted = formatData(business);
    expect(JSON.stringify(correctFormat)).toBe(JSON.stringify(formatted));
  });

  it("creates the correct data format for react-table (multiple VatRefs)", () => {
    const business = {
      companyNo: '123456AB',
      vatRefs: ['123', '456'],
      payeRefs: [234],
    };
    const correctFormat = [{
      companyNo: '123456AB',
      vatRefs: '123',
      payeRefs: 234,
    },{
      companyNo: '',
      vatRefs: '456',
      payeRefs: '',
    }];
    const formatted = formatData(business);
    expect(JSON.stringify(correctFormat)).toBe(JSON.stringify(formatted));
  });

  it("creates the correct data format for react-table (multiple PayeRefs)", () => {
    const business = {
      companyNo: '123456AB',
      vatRefs: ['123'],
      payeRefs: [234, 567],
    };
    const correctFormat = [{
      companyNo: '123456AB',
      vatRefs: '123',
      payeRefs: 234,
    },{
      companyNo: '',
      vatRefs: '',
      payeRefs: 567,
    }];
    const formatted = formatData(business);
    expect(JSON.stringify(correctFormat)).toBe(JSON.stringify(formatted));
  });
});