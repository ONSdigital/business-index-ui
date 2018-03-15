/* eslint no-unused-vars: "off" */

/**
 * @class Session - This class will be extended by the other session classes
 *
 * @param  {String} name - The name of the session type (redis/json etc.)
 */
class Session {
  constructor(name) {
    this.name = name;
  }

  /**
   *
   * @function createSession - Create a session for the user
   *
   * @param {String} username - The users username
   * @param {String} remoteAddress - The remote IP address of the user
   * @param {String} role - The user role (admin/test etc.)
   * @param {String} apiKey - The apiKey to attach to the session
   *
   * @return {Promise} - A promise which will resolve/reject with a JSON object
   * Resolve: { accessToken }
   * Reject: { error }
   */
  createSession(username, remoteAddress, role, apiKey) {}

  /**
   *
   * @function getSession - Get the users session
   *
   * @param {String} accessToken - The users accessToken (stored in their browser)
   *
   * @return {Promise} - A promise which will resolve/reject with a JSON object
   * Resolve: { username, accessToken, role, apiKey }
   * Reject: { error }
   */
  getSession(accessToken) {}

  /**
   *
   * @function killSession - Kill a users session
   *
   * @param {String} accessToken - The users accessToken
   *
   * @return {Promise} - A promise which will resolve/reject with a JSON object
   * Resolve: {}
   * Reject: { error }
   */
  killSession(accessToken) {}
 }

module.exports = Session;
