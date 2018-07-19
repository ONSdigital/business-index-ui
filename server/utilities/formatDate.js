'use strict';

// Rule exceptions:
/* eslint strict: "off" */

function formatDate(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;

  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const today = `${yyyy}/${mm}/${dd}`;
  const time = new Date().toLocaleTimeString('gb');
  return `${today} ${time}`;
}

module.exports = formatDate;
