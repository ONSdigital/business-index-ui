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
