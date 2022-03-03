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

async function addOne(group_name, creator) {
  try {
    const user = await User.findOne({ username: creator });
    const user_id = user._id;
    const group = new Group({
      group_name: group_name,
      creator_id: user_id,
      members: [],
      rooms: [],
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
