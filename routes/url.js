const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics } = require('../controller/url');

const path = require('path');

const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;