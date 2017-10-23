// @flow

/**
 * @function validateRefSearch(length)
 *
 * @param  {int} length - The length of ref input
 *
 * @return {string} Validation state string for bootstrap
 */
export function validateRefSearch(length: number) {
  if (length > 12) return 'error';
  else if (length > 5) return 'success';
  else if (length > 0) return 'error';
  return 'error';
}
