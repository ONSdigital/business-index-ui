import { maxSize } from '../../src/utils/helperMethods';

describe("Helper Methods test suite", () => {
  it("gets the maxSize of given arrays", () => {
    const arr1 = [1, 2, 3]; 
    const arr2 = [1];
    const largest = maxSize(arr1, arr2);
    expect(largest).toBe(arr1.length);
  });
});