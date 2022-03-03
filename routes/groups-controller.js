const Group = require("../models/Group");

async function findAll(){
  try{
    const groups = await Group.find();
    return groups;
  } catch(err){
    return false;
  }
}

async function findOne(name){
  try{
    const group = await Group.findOne({username: name});
    return group;
  } catch(err){
    return false;
  }
}

async function addOne(username, password){
  const group = new Group({username: username, password: password});
  try {
      await group.save();
      return group;
  } catch(err) {
      return false;
  }
}


module.exports = Object.freeze({
  findOne,
  addOne,
  findAll
});