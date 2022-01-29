const express = require('express');
// const Freets = require('../models/Freets');
const router = express.Router();

/**
 * GET home page.
 * 
 * @name GET /
 */
router.get('/', (req, res) => {
  res.render('index', { title: 'Chimera' });
});


module.exports = router;
