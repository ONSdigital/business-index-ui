import config from '../config/validation';

const { UBRN } = config;

/**
 * @function validateUBRNSearch(length)
 *
 * @param  {string} query - The UBRN query
 *
 * @return {string} Validation state string for bootstrap
 */
export function validateUBRNSearch(query) {
  if ((query.length >= UBRN.min && query.length <= UBRN.max) && !isNaN(query)) return 'success';
  return 'error';
}
