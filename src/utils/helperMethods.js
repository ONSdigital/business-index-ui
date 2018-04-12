import React from 'react';
import { employmentBands, legalStatusBands, tradingStatusBands, turnoverBands } from './convertBands';

/**
 * @const _pipe - Given two functions, f and g and curried arguments (...args), pass
 * the result of f(...args) into g, returning the resulting function
 *
 * @param {function} f - The first function
 * @param {function} g - The second function
 *
 * @return {function} - Return a function composition of calling g with the result
 * of f(...args)
 */
const _pipe = (f, g) => (...args) => g(f(...args));

/**
 * @const pipe - Given any number of functions, run those functions on a curried
 * input.
 *
 * e.g. pipe(addOne, multiplyBy5)(2)
 *
 * The above will return 15 (assuming addOne and multiplyBy5 are implemented)
 *
 * @param {function} fns - Any number of functions
 *
 * @return {Any} - The result of running the provided functions on an argument
 */
const pipe = (...fns) => fns.reduce(_pipe);

// Below are immutable transformations on a business object to convert the bands
const convertLegalStatus = (x) => ({ ...x, legalStatus: legalStatusBands[x.legalStatus] });
const convertTradingStatus = (x) => ({ ...x, tradingStatus: tradingStatusBands[x.tradingStatus] });
const convertTurnover = (x) => ({ ...x, turnover: turnoverBands[x.turnover] });
const convertEmploymentBands = (x) => ({ ...x, employmentBands: employmentBands[x.employmentBands] });


/**
 * @const maxSize - Given any number of arrays, return the size of the largest
 *
 * @param {Array} args - Any number of arrays
 *
 * @return {Number} - The size of the largest array
 */
const maxSize = (...args) => args.reduce((a, b) => (b.length > a ? b.length : a), 0);


/**
 * @const numberWithCommas - Make a number more human readable
 *
 * Source: https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 *
 * @param {Number} x - The number to add commas to
 *
 * @return {String}
 */
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


/**
 * @const formatData - Format references from a Business object into a format
 * that react-table can handle.
 *
 * @param {Object} business - Business JSON from the API
 *
 * @return {Array} - An array with an object for each table row
 */
const formatData = (business) => {
  const largestRef = maxSize(business.vatRefs, business.payeRefs, [business.companyNo]);
  return Array.from({ length: largestRef }, (a, b) => {
    if (b === 0) {
      return {
        companyNo: (business.companyNo !== undefined) ? business.companyNo : '',
        vatRefs: (business.vatRefs[b] !== undefined) ? business.vatRefs[b] : '',
        payeRefs: (business.payeRefs[b] !== undefined) ? business.payeRefs[b] : '',
      };
    }
    return {
      companyNo: '',
      vatRefs: (business.vatRefs[b] !== undefined) ? business.vatRefs[b] : '',
      payeRefs: (business.payeRefs[b] !== undefined) ? business.payeRefs[b] : '',
    };
  });
};


/**
 * @const everyKeyMatches - Given an object, will return true if every one of it's keys matches the
 * value you provide it. It has to be an exact match as '===' are used.
 *
 * @param {Object} obj - The object whose keys need to be checked
 * @param {Any} value - The value to match on
 *
 * @return {Boolean} - True if every key matches the given value
 */
const everyKeyMatches = (obj, value) => Object.keys(obj).map(key => (obj[key] === value)).reduce((a, b) => a && b);


/**
 * @const handleFormChange - This is used in SearchHOC for transforming the form
 * data when a change is made, e.g. delete empty keys
 *
 * @param {Object} form - The object with all the form values
 * @param {String} id - The id of the input that changed
 * @param {Any} value - This could be a string or an object
 *
 * @return {Object} - The transformed form JSON
 */
const handleFormChange = (form, id, value) => {
  // Take a copy of the form JSON so we don't mutate the original
  const formCopy = { ...form };

  // If setting to empty, delete
  if (value.constructor === Object && everyKeyMatches(value, '')) {
    delete formCopy[id];
  } else if (value === '') {
    delete formCopy[id];
  } else if (Array.isArray(value) && value.length === 0) {
    // Multiple select input will return an empty array if nothing is selected
    delete formCopy[id];
  } else if (id === 'BusinessName' || id === 'PostCode') {
    formCopy[id] = value.toUpperCase();
  } else {
    formCopy[id] = value;
  }
  return formCopy;
};


/**
 * @const formSelectJson - Given some JSON including key value pairs (e.g. C: '2-4'),
 * transform the JSON into an array of JSON objects with the format:
 * { label: 'C [2-4]', value: 'C' }. This is to create the correct format for the
 * react-select component
 *
 * @param {Object} json
 *
 * @return {Object} - An object with the correct format for react-select
 */
const formSelectJson = (json) => Object.keys(json).map(key => ({ label: `${key} [${json[key]}]`, value: key }));


/**
 * @const getHighlightedText
 *
 * https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
 *
 * @param {Object} row - A business object
 * @param {String} higlight - The word/phrase to highlight
 *
 * @return {Object} A <em> with a highlighted term (or not if it's not present)
 */
const getHighlightedText = (row, higlight) => {
  // Split text on higlight term, include term itself into parts, ignore case
  try {
    const parts = row.businessName.split(new RegExp(`(${higlight})`, 'gi'));
    // We can use the array index as a key as we already use the UBRN as part of the key
    /* eslint react/no-array-index-key: "off" */
    return (
      <span key={row.id}>
        {parts.map((part, i) => (
            part.toLowerCase() === higlight.toLowerCase() ?
              (<em className="highlight" key={`${row.id}-${i}`} style={{ backgroundColor: '#FFFF00' }}>
                {part}
              </em>)
            : part),
          )
        }
      </span>);
  } catch (e) {
    // Catch the invalid regular expressions
    return (<em key={row.id}>{row.businessName}</em>);
  }
};


/**
 * @const anyKeyEmpty - Check if any key within a given object is empty
 *
 * @param {Object} obj - The object to check
 *
 * @return {Boolean} - True if any key is empty
 */
const anyKeyEmpty = (obj) => Object.keys(obj).map(key => (obj[key] === '')).reduce((a, b) => a || b);


export {
  formatData, handleFormChange, formSelectJson, getHighlightedText,
  everyKeyMatches, anyKeyEmpty, maxSize, numberWithCommas, pipe,
  convertLegalStatus, convertTradingStatus, convertTurnover, convertEmploymentBands,
};
