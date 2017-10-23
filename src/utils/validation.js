// @flow

import config from '../config/validation';

const { UBRN } = config;

/**
 * @function validateUBRNSearch(length)
 *
 * @param  {int} length - The length of ref input
 *
 * @return {string} Validation state string for bootstrap
 */
export function validateUBRNSearch(length: number) {
  if (length >= UBRN.min && length <= UBRN.max) return 'success';
  return 'error';
}
