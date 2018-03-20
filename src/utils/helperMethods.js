import React from 'react';

export function maxSize(...args) {
  return args.reduce((a, b) => (b.length > a ? b.length : a), 0);
}

export function formatData(business) {
  const largestRef = maxSize(business.vatRefs, business.payeRefs, [business.companyNo]);
  const formattedData = [];
  for (let i = 0; i <= largestRef - 1; i += 1) {
    if (i === 0) {
      formattedData.push({
        companyNo: business.companyNo,
        vatRefs: business.vatRefs[i],
        payeRefs: business.payeRefs[i],
      });
    } else {
      formattedData.push({
        companyNo: '',
        vatRefs: business.vatRefs[i],
        payeRefs: business.payeRefs[i],
      });
    }
  }
  return formattedData;
}

const _pipe = (f, g) => (...args) => g(f(...args));
const pipe = (...fns) => fns.reduce(_pipe);

export const emptyObjCond = (childObj) => childObj.constructor === Object && everyKeyMatches(childObj, '');
export const emptyStrCond = (str) => str === '';
export const emptyArrCond = (child) => Array.isArray(child) && child.length === 0;

const delKey = (obj, id) => {
  const { [id]: value, ...newObj } = obj;
  return newObj;
};

export const removeEmptyKey = (obj, id, value) => (...fns) => {
  return (fns.map(f => f(value)).reduce((a, b) => a || b)) ? delKey(obj, id) : obj;
};

export const handleFormChange = (form, id, value) => {
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
export const formSelectJson = (json) => Object.keys(json).map(key => ({ label: `${key} [${json[key]}]`, value: key }));


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
export const getHighlightedText = (row, higlight) => {
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
 * @const everyKeyMatches - Given an object, will return true if every one of it's keys matches the
 * value you provide it. It has to be an exact match as '===' are used.
 *
 * @param {Object} obj - The object whose keys need to be checked
 * @param {Any} value - The value to match on
 *
 * @return {Boolean} - True if every key matches the given value
 */
export const everyKeyMatches = (obj, value) => Object.keys(obj).map(key => (obj[key] === value)).reduce((a, b) => a && b);

/**
 * @const anyKeyEmpty - Check if any key within a given object is empty
 *
 * @param {Object} obj - The object to check
 *
 * @return {Boolean} - True if any key is empty
 */
export const anyKeyEmpty = (obj) => Object.keys(obj).map(key => (obj[key] === '')).reduce((a, b) => a || b);
