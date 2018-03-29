import {
  maxSize, formatData, everyKeyMatches, handleFormChange,
  formSelectJson, anyKeyEmpty, numberWithCommas
} from '../../src/utils/helperMethods';

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

describe("everyKeyMatches", () => {
  it("returns true if every key matches a value", () => {
    const result = everyKeyMatches({ a: '', b: '', c: '' }, '');
    expect(result).toBe(true);
  });

  it("returns false if any key matches does not match the value", () => {
    const result = everyKeyMatches({ a: 'abc', b: '', c: '' }, '');
    expect(result).toBe(false);
  });

  it("returns false if any key matches does not match the value (equality test)", () => {
    const result = everyKeyMatches({ a: '1', b: '1', c: '1' }, 1);
    expect(result).toBe(false);
  });
});

describe("handleFormChange", () => {
  it("removes empty keys (string)", () => {
    const result = handleFormChange({ BusinessName: '', PostCode: 'ABC 123' }, 'BusinessName', '');
    const expected = {
      PostCode: 'ABC 123',
    };
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it("removes empty keys (object)", () => {
    const result = handleFormChange({
      IndustryCode: {
        min: '',
        max: '',
        single: '',
    }, PostCode: 'ABC 123' }, 'IndustryCode', { min: '', max: '', single: '' });
    const expected = {
      PostCode: 'ABC 123',
    };
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it("removes empty keys (array)", () => {
    const result = handleFormChange({ PayeRefs: [], PostCode: 'ABC 123' }, 'PayeRefs', []);
    const expected = {
      PostCode: 'ABC 123',
    };
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it("transforms businessName to upper case", () => {
    const result = handleFormChange({ BusinessName: 'a' }, 'BusinessName', 'a');
    const expected = {
      BusinessName: 'A',
    };
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });

  it("transforms businessName to upper case", () => {
    const result = handleFormChange({ PostCode: 'a' }, 'PostCode', 'a');
    const expected = {
      PostCode: 'A',
    };
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });
});

describe("formSelectJson", () => {
  it("returns true if every key matches a value", () => {
    const result = formSelectJson({ a: '1', b: '2', c: '3' });
    const expected = [
      { label: 'a [1]', value: 'a' },
      { label: 'b [2]', value: 'b' },
      { label: 'c [3]', value: 'c' },
    ];
    expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
  });
});

describe("anyKeyEmpty", () => {
  it("returns true if any key is empty", () => {
    const result = anyKeyEmpty({ a: '1', b: '2', c: '' });
    expect(result).toBe(true);
  });

  it("returns false if no keys are empty", () => {
    const result = anyKeyEmpty({ a: '1', b: '2', c: '3' });
    expect(result).toBe(false);
  });
});

describe("numberWithCommas", () => {
  it("returns a small number with no commas", () => {
    const result = numberWithCommas(100);
    expect(result).toBe('100');
  });

  it("returns a large number with commas", () => {
    const result = numberWithCommas(100000);
    expect(result).toBe('100,000');
  });

  it("returns a very large number with commas", () => {
    const result = numberWithCommas(100000000);
    expect(result).toBe('100,000,000');
  });

  it("handles being passed a string", () => {
    const result = numberWithCommas('Error');
    expect(result).toBe('Error');
  });
});
