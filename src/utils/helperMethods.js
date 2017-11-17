// @flow

export function countStatus(history: Array<{}>, status: number) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode === status).length;
}

export function countStatusBetween(history: Array<{}>, status: object) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode >= status.min && h.HTTPCode <= status.max).length;
}

export function formatResultsTable(results: Array<{}>) {
  const formattedResults: Array<{}> = [];
  results.forEach((i) => {
    const record: Object = i;
    if (record.source === 'VAT' || record.source === 'Legal Unit') {
      record.name = record.businessName;
    }
    formattedResults.push(record);
  });
  return formattedResults;
}

export function getValueByKey(object: {}, toGet: string) {
  return (toGet in object) ? object[toGet] : '';
}

export function getChildValues(json: {}, compareString: string) {
  const arr: Array<{}> = [];
  Object.keys(json).forEach((k) => {
    if (json[k] === compareString) {
      const obj: {} = {};
      obj[compareString] = k;
      arr.push(obj);
    }
  });
  return arr;
}

export function getLegalStatusDescription(status: string) {
  switch (status) {
    case '1':
      return 'Company';
    case '2':
      return 'Sole Proprietor';
    case '3':
      return 'Partnership';
    case '4':
      return 'Public Corporation';
    case '5':
      return 'Central Government';
    case '6':
      return 'Local Authority';
    case '7':
      return 'Non-Profit Body';
    default:
      return 'Not Allocated';
  }
}

export function maxSize(...args) {
  return args.reduce((a, b) => (b.length > a ? b.length : a), 0);
}

export function formatData(business: {}) {
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
