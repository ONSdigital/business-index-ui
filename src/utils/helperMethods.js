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
