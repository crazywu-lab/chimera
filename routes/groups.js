const express = require('express');

const Groups = require("./groups-controller");
// const Freets = require('../models/Freets');

const validateThat = require('../middleware/validation');
const authorizeThat = require('../middleware/authorization');
const router = express.Router();


/**
 * List all groups.
 * 
 * @name GET /api/users
 * @return {User[]} - list of all stored shorts
 */

router.get('/', async (req, res) => {
  const groups = await Groups.findAll();
  if(groups !== false){
    res.status(200).json(groups).end();
  }
  
});

module.exports = router;