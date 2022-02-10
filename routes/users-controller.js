const User = require("../models/User");

async function findOne(name){
  try{
    const user = await User.find({username: name});
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
  addOne
});