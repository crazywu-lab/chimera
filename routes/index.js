const express = require('express');
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
