const User = require("../models/User");

async function findAll(){
  try{
    const users = await User.find();
    return users;
  } catch(err){
    return false;
  }
}

async function findOne(name){
  try{
    const user = await User.findOne({username: name});
    return user;
  } catch(err){
    return false;
  }
}

async function addOne(username, password){
  const user = new User({username: username, password: password});
  try {
      await user.save();
      return user;
  } catch(err) {
      return false;
  }
}


module.exports = Object.freeze({
  findOne,
  addOne,
  findAll
});