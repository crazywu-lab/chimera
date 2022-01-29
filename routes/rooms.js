const express = require("express");

const Rooms = require("../models/Rooms");
const validateThat = require('../middleware/validation');
const authorizeThat = require('../middleware/authorization');

const router = express.Router();

/**
 * View Rooms by all
 *
 * @name GET /api/Rooms
 *
 * @return {freet[]} - list of all stored Rooms if author is not given, else list of stored Rooms with given author
 * */
router.get("/all", (req, res) => {
  res.status(200).json(Rooms.findAll()).end();
});

router.get("/getItems/:roomID?", (req, res) => {
  console.log(Rooms.findById(req.params.roomID))
  res.status(200).json(Rooms.findById(req.params.roomID)).end();
});

/**
 * View Rooms by one
 *
 * @name GET /api/Rooms/:author?
 * @param {string} authorID - author ID to filter by (query parameter, optional)
 *
 * @return {freet[]} - list of all stored Rooms if author is not given, else list of stored Rooms with given author
 * */
router.get("/:author?", (req, res) => {
  res.status(200).json(Rooms.findAuthorAll(req.params.author)).end();
});


/**
 * Create a room (must signed in first)
 *
 * @name POST /api/Rooms/
 *
 * @param {string} userID - authorID (req.session.userID)
 * @param {string} content - content of freet
 * @return {freet} - the posted freet
 * @throws {401} - if the user is not logged in
 * @throws {400} - if content is not filled
 * */
router.post("/", (req, res) => {
  const room = Rooms.addOne(req.body.fname, req.session.username);
  res.status(201).json(room).end();
  console.log(req.body);
});

/**
 * Create an Item. You have to be a signed in user.
 * 
 * @name POST /api/Rooms/create
 * @return {Item} - the created Item, as well as 200 status code for success, 403 for user not logged in 
 */
//  router.post("/create", (req, res) => {
//   const item = Items.addOne(req.body.newItem, req.session.userID, req.session.username);
//   Users.addItem(item.id, req.session.userID);
//   Fridges.addItem(item.id, item.fridge)
//   res.status(200).json(item).end();
// });

// /**
//  * Edit a freet.
//  *
//  * @name PUT /api/Rooms/:id?
//  *
//  * @param {string} id - freetID (req.body.id)
//  * @param {string} content - content of freet
//  * @return {200} - freet has been updated
//  * @throws {401} - if the user is not logged in
//  * @throws {401} - if the freetID is not filled
//  * @throws {404} - if the freetID is not found
//  * @throws {400} - if content is not filled
//  * @throws {401} - if content is not filled
//  */
// router.put(
//   "/:id?",
//   [
//     validateThat.userIsLoggedIn,
//   ],
//   (req, res) => {
//     // return the updated freet with new content
//     res
//       .status(200)
//       .json(
//         Rooms.updateOne(req.params.id, req.body.content, req.session.userID)
//       )
//       .end();
//   }
// );

// /**
//  * Add Member to room.
//  *
//  * @name PUT /api/Rooms/:id?
//  *
//  * @param {string} id - freetID (req.body.id)
//  * @param {string} content - content of freet
//  * @return {200} - freet has been updated
//  * @throws {401} - if the user is not logged in
//  * @throws {401} - if the freetID is not filled
//  * @throws {404} - if the freetID is not found
//  * @throws {400} - if content is not filled
//  * @throws {401} - if content is not filled
//  */
//  router.put(
//   "/addMember/:id?",
//   [
//     // validateThat.userIsLoggedIn,
//     validateThat.checkroomHasUser,
//     validateThat.memberExists
//   ],
//   (req, res) => {
//     // return the updated freet with new content
//     res
//       .status(200)
//       .json(
//         Rooms.addMember(req.params.id, req.body.newmember)
//       )
//       .end();
//     console.log(req.body)
//   }
// );

// /**
//  * Delete a room (must login).
//  *
//  * @name DELETE /api/Rooms/:id?
//  *
//  * @param {string} id - freetID (req.query.id)
//  * @return {200} - freet has been deleted
//  * @throws {401} - if the user is not logged in
//  * @throws {400} - if freetID is not filled
//  * @throws {404} - if the freet is not found
//  * @throws {401} - if the freet's authorID does not match the userID in the current session
//  */
// router.delete("/:id?", [validateThat.userIsLoggedIn], (req, res) => {
//   // return the updated freet list created by the current account to show the success of deletion
//   res.status(200).json(Rooms.deleteOne(req.params.id)).end();
// });

// /**
//  * Delete a room member(must login).
//  *
//  * @name DELETE /api/Rooms/:id?
//  *
//  * @param {string} id - freetID (req.query.id)
//  * @return {200} - freet has been deleted
//  * @throws {401} - if the user is not logged in
//  * @throws {400} - if freetID is not filled
//  * @throws {404} - if the freet is not found
//  * @throws {401} - if the freet's authorID does not match the userID in the current session
//  */
//  router.delete("/removeMember/:id?/:member?", [validateThat.userIsLoggedIn], (req, res) => {
//   res.status(200).json(Rooms.deleteMember(req.params.id, req.params.member)).end();
// });


module.exports = router;
