const Group = require("../models/Group");
const Room = require("../models/Room");
const User = require("../models/User");

async function findOne(name) {
  try {
    const group = await Group.findOne({ group_name: name });
    return group;
  } catch (err) {
    return false;
  }
}

async function addOne(group_name, members_num, members, files, creator) {
  try {
    const user = await User.findOne({ username: creator });
    const user_id = user._id;
    const rooms_arr = [];
    for(let i = 0; i < members_num; i++){
      let room = new Room({room_name: i, group_name: group_name, creator_id: user_id, member: [], currentReader: members[i], reading: [files[i]]});
      rooms_arr.push(room);
    }
    const group = new Group({
      group_name: group_name,
      creator_id: user_id,
      members_num: members_num,
      members: members,
      rooms: rooms_arr,
    });
    await group.save();
    return group;
  } catch (err) {
    return false;
  }
}

async function findAll() {
  try {
    const groups = await Group.find();
    return groups;
  } catch (err) {
    return false;
  }
}

async function deleteOne(name) {
  try {
    const group = await Group.deleteOne({ group_name: name });
    return group;
  } catch (err) {
    return false;
  }
}

module.exports = Object.freeze({
  findOne,
  addOne,
  findAll,
  deleteOne,
});
