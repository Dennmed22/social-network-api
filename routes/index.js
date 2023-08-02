const express = require('express');
const apiRoutes = require('./api');

const router = express.Router();

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.status(404).send('Incorrect Route!');
});

module.exports = router;
