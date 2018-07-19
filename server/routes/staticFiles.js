'use strict';

const app = require('../index');
const express = require('express');
const path = require('path');

const router = express.Router();

// Always return the main index.html, so react-router renders the route in the client
router.get('*', app.cache(), (req, res) => {
  res.sendFile(path.resolve(__dirname, '../..', 'build', 'index.html'));
});

module.exports = router;
