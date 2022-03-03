const express = require('express');

const Groups = require("./groups-controller");

const validateThat = require('../middleware/validation');
const authorizeThat = require('../middleware/authorization');

const router = express.Router();


/**
 * View Rooms by all
 *
 * @name GET /api/Rooms
 *
 * @return {rooms[]} - list of all stored Rooms if author is not given, else list of stored Rooms with given author
 * */
 router.get("/all", async (req, res) => {
    const groups = await Groups.findAll();
    res.status(200).json(groups).end();
  });
  
  router.get("/getGroup/:group_name?", async (req, res) => {
    const group = await Groups.findOne(req.params.group_name);
    res.status(200).json(group).end();
  });
  
  
  /**
   * Create a room (must signed in first)
   *
   * @name POST /api/Rooms/
   *
   * @param {string} userID - authorID (req.session.userID)
   * @param {string} content - content of freet
   * @return {room} - the posted freet
   * @throws {401} - if the user is not logged in
   * @throws {400} - if content is not filled
   * */
  router.post("/",  async (req, res) => {
    let creator = (req.session.username == undefined) ? 'anonymous' : req.session.username;
    const group = await Groups.addOne(req.body.group_name, creator);
    if(group !== false){
      res.status(201).json(group).end();
    }
  });
  
  /**
   * Delete a room (must login).
   *
   * @name DELETE /api/Rooms/:id?
   *
   * @param {string} id - freetID (req.query.id)
   * @return {200} - freet has been deleted
   * @throws {401} - if the user is not logged in
   * @throws {400} - if freetID is not filled
   * @throws {404} - if the freet is not found
   * @throws {401} - if the freet's authorID does not match the userID in the current session
   */
   router.delete("/:group_name?", [authorizeThat.signedIn], async (req, res) => {
     // return the updated freet list created by the current account to show the success of deletion
     const group = await Groups.deleteOne(req.params.group_name);
     res
       .status(200)
       .json(group)
       .end();
   });

module.exports = router;