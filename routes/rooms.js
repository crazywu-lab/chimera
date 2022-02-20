const express = require("express");

const Rooms = require("./rooms-controller");
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
router.get("/all", async (req, res) => {
  const rooms = await Rooms.findAll();
  res.status(200).json(rooms).end();
});

router.get("/getRoom/:room_name?", async (req, res) => {
  const room = await Rooms.findOne(req.params.room_name);
  res.status(200).json(room).end();
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
router.post("/", [validateThat.roomDuplicate], async (req, res) => {
  let creator = (req.session.username == undefined) ? 'anonymous' : req.session.username;
  const room = await Rooms.addOne(req.body.room_name, creator);
  if(room !== false){
    res.status(201).json(room).end();
  }
  console.log(room);
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
 router.delete("/:room_name?", [authorizeThat.signedIn], async (req, res) => {
   // return the updated freet list created by the current account to show the success of deletion
   const room = await Rooms.deleteOne(req.params.room_name);
   res
     .status(200)
     .json(room)
     .end();
 });

//Delete a pdf
 router.delete("/deletePDF/:room_name?/:filename?", [authorizeThat.signedIn], async (req, res) => {
  // return the updated freet list created by the current account to show the success of deletion
  console.log(req.body);
  const room = await Rooms.deleteItem(req.params.filename, req.params.room_name);
  res
    .status(200)
    .json(room)
    .end();
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
