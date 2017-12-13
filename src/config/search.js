const search = {
  MATCH: {
    title: 'Match Search',
    description: 'Search the Business Index.',
    storeName: 'match',
    showPagination: true,
    showFilter: true,
    defaultPageSize: 10,
  },
  RANGE: {
    title: 'Range Search',
    description: 'Search the Business Index on a range of fields.',
    storeName: 'range',
    showPagination: true,
    showFilter: true,
    defaultPageSize: 10,
  },
  UBRN: {
    title: 'UBRN Lookup',
    description: 'Search the Business Index for a Unique Business Reference Number.',
    storeName: 'ubrn',
    showPagination: false,
    showFilter: false,
    defaultPageSize: 1,
  },
};

export default search;
