const Group = require("../models/Group");
const User = require("../models/User");



async function findOne(name) {
  try {
    const group = await Group.findOne({ group_name: name });
    return group;
  } catch (err) {
    return false;
  }
}

async function findLatestFile(group_name, room_name) {
  try {
    const group = await Group.findOne({ group_name: group_name });
    const readings = group.rooms[room_name].readings;
    const latest_file = readings[readings.length-1];
    return latest_file;
  } catch (err) {
    return false;
  }
}

async function addOne(group_name, members_num, members, files, creator) {
  try {
    const user = await User.findOne({ username: creator });
    const user_id = user._id;
    const rooms_arr = [];
    for (let i = 0; i < members_num; i++) {
      let room = {
        room_name: i,
        group_name: group_name,
        creator_id: user_id,
        members: [],
        currentReader: members[i],
        readings: [files[i]],
        readings_creators: [creator]
      }
      rooms_arr.push(room);
    }
    const group = new Group({
      group_name: group_name,
      creator_id: user_id,
      members_num: members_num,
      members: members,
      currentWeek: 0,
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

async function rotation(group_name) {
  try {
    const group = await Group.findOne({ group_name: group_name });
    let currentWeek = group.currentWeek + 1;
    const newGroup = await Group.updateOne(
      {group_name: group_name},
      { $set: {"currentWeek": currentWeek}}
    );
    return newGroup;
  } catch (err) {
    return false;
  }
}

module.exports = Object.freeze({
  findOne,
  findLatestFile,
  addOne,
  findAll,
  rotation,
  deleteOne,
});
