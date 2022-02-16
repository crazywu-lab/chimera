const Room = require("../models/Room");
const User = require("../models/User");

async function findOne(name){
  try{
    const room = await Room.findOne({room_name: name});
    return room;
  } catch(err){
    return false;
  }
}

async function addOne(room_name, creator){
  try {
        const user = await User.findOne({username: creator});
        const user_id = user._id;
        const room = new Room({room_name: room_name, creator_id: user_id});
        await room.save();
        return room;
  } catch(err) {
      return false;
  }
}

async function findAll(){
    try{
        const rooms = await Room.find();
        return rooms;
    } catch(err) {
        return false;
    }
}

async function deleteOne(name){
  try{
    const room = await Room.deleteOne({room_name: name});
    return room;
  } catch(err) {
    return false;
  }
}


module.exports = Object.freeze({
  findOne,
  addOne,
  findAll,
  deleteOne
});