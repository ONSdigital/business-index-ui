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
 * @const focusAndSetState - This is a helper method to combine common login when closing an
 * error modal, so that a particular ref can be focused on and state can be set.
 *
 * @param {Object} context - The calling context (this)
 * @param {String} focusOn - The ref to focus on
 * @param {Object} stateToSet - The state to set, e.g. { errorMsg: '' }
 */
export const focusAndSetState = (context, focusOn, stateToSet) => {
  context.setState(stateToSet);
  context[focusOn].focus();
};
