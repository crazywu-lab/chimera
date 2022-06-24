let roomsData = [];

// Need ability to generate random IDs (primary/foreign keys)
const uuid = require("uuid");

/**
 * @typedef rooms
 *
 * @prop {Array} items - list of items in room
 * @prop {string} creatorID -  user ID of room author
 * @prop {string} roomID - roomID
 * @prop {string} name - room name
 * @prop {Array} members - list of users we are members of the room
 */

class Rooms {
  /**
   * Add a freet to the collection.
   *
   * @prop {Array[Item]} items - list of items in room
   * @prop {string} creatorUsername - user ID of room author
   * @prop {string} roomID - roomID
   * @prop {string} name - room name
   * @prop {Array} members - list of users we are members of the room
   * @return {room} - the newly created freet
   */
  static addOne(name, creator) {
    const roomID = uuid.v4();
    const items = [];
    const members = [];
    const numMembers = members.length;
    const room = {
      roomID,
      creator,
      items,
      members,
      name,
      numMembers,
    };
    roomsData.push(room);
    console.log(roomsData)
    return room;
  }

  static deleteOne(id) {
    roomsData = roomsData.filter((room) => !(room.roomID == id));
    return roomsData;
  }

  static deleteAuthorAll(creatorID) {
    roomsData = roomsData.filter(
      (room) => !(room.CreatorID === creatorID)
    );
    return roomsData;
  }

  static findAll() {
    return roomsData;
  }

  static findById(id) {
    return roomsData.filter((room) => room.roomID === id)[0];
  }

  static findAuthorAll(creatorID) {
    console.log(creatorID)
    console.log(roomsData)
    console.log(roomsData.filter((room) => room.creatorID === creatorID))
    return roomsData.filter((room) => room.creatorID === creatorID);
  }

  static addItem(item, roomID) {
    const room = Rooms.findById(roomID);
    room.items.push(item);
    console.log(room)
    return room;
  }

  static addMember(roomID, username) {
    const room = Rooms.findById(roomID);
    room.members.push(username);
    return room;
  }

  static findMemberInroom(roomID, username) {
    const room = Rooms.findById(roomID);
    return room.members.filter((member) => member === username);
  }

  static deleteMember(roomID, username) {
    const room = Rooms.findById(roomID);
    console.log(username);
    room.members = room.members.filter((member) => member !== username);
    console.log(room);
    return room;
  }

}

module.exports = Rooms;
