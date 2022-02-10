let data = [];

/**
 * @typedef User
 * @prop {string} username - some string, valid in a URL path
 * @prop {string} password - some string, valid in a URL path
 * @prop {string{}} upvotedFreets - The list of upvoted freets
 * @prop {string{}} reFreets - The list of upvoted freets
 * @prop {string{}} followers - The list of followers
 * @prop {string{}} followings - The list of followings
 */

/**
 * @class Users
 * 
 * Stores all Users' accounts. Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  

  /**
   * Add a User to the collection.
   * 
   * @param {string} username - The name of the user
   * @param {string} password - The password of the user
   * @param {string[]} upvotedFreets
   * @return {User} - the newly created user
   */
  static addOne(user_name, username, password) {
    const user = { 
      user_name,
      username, 
      password,
    };
    data.push(user);
    return user;
  }

  /**
   * @return {User[]} an array of all of the Users
   */
  static findAll() {
    return data;
  }

  /**
   * @return {Array} an array of all usernames
   */
  static findAllUsername(){
    let username_list = []
    for (let i=0; i<data.length; i++){
      username_list.push(data[i].username)
    }
    return  username_list
  }

  /**
   * Find a User by username.
   * 
   * @param {string} username - The name of the User to find
   * @return {User | undefined} - the found User with above username
   */
  static findOne(username) {
    return data.filter(user => user.username === username)[0];
  }


  /**
   * Update a User's username.
   * 
   * @param {string} username - The username of the User to update
   * @param {string} newName - The new username to associate with the User
   * @return {User | undefined} - The updated User
   */
  static changeUsername(username, newName) {
    const user = Users.findOne(username);
    user.username = newName;
    return user;
  }

  /**
   * Update a User's password.
   * 
   * @param {string} username - The username of the User to update
   * @param {string} newPassword - The new password to associate with the User
   * @return {User | undefined} - The updated User
   */
  static changePassword(username, newPassword) {
    const user = Users.findOne(username);
    user.password = newPassword;
    return user;
  }

  /**
   * Delete a User from the collection.
   * 
   * @param {string} username - name of User to delete
   * @return {User | undefined} - deleted User
   */
  static deleteOne(username) {
    const user = Users.findOne(username);
    data = data.filter(s => s.username !== username);
    return user;
  }

}


module.exports = Users;