const Users = require('../routes/users-controller');
const Rooms = require('../routes/rooms-controller');
const alphaExp = /^[a-zA-Z0-9]+$/;


const inputAuthorEmpty = (req, res, next) => {
    const author = req.params.author;
    if(author === undefined || author === ''){
        res.status(400).json({ 
            error: 'Please enter name of an author first.'
        }).end();
        return;
    }
    next();
};

const authorExists = (req, res, next) =>{
    const userExist = Users.findAllUsername().includes(req.params.author || req.body.author )
    if(!userExist ){ // author not found
        res.status(404).json({
          error: `Author ${req.params.author} is not found.`
        }).end();
        return;
    }
    next();
};

//users
const usernameEmpty = (req, res, next) => {
    const username = req.body.username 
    if(username === undefined || username === '' ){
        res.status(400).json({ 
            error: 'Please enter your username.'
        }).end();
        return;
    }
    next();
};
const passwordEmpty = (req, res, next) => {
    const password = req.body.password;
    if(password === undefined || password === '' ){
        res.status(400).json({ 
            error: 'Please enter your password.'
        }).end();
        return;
    }
    next();
};
const usernameMatch = async (req, res, next) =>{
    const usernameExist = await Users.findOne(req.body.username)
    if(usernameExist == false ){ // author not found
        res.status(404).json({
          error: `Username ${req.body.username} is not found.`
        }).end();
        return;
    }
    next();
};

const passwordMatch = async (req, res, next) =>{
    const user = await Users.findOne(req.body.username);
    const password = user.password;
    const passwordInput = req.body.password;
    if(passwordInput != password){ // author not found
        res.status(404).json({
          error: "The password doesn't match our records."
        }).end();
        return;
    }
    next();
};


const sessionNotNull = (req, res, next) =>{
    if (req.session.username !== undefined ){
        res.status(400).json({ 
            error: 'You should log out first before signing in another account.' 

        }).end();
        return;
    }
    next();
};
const sessionNull = (req, res, next) =>{
    if (req.session.username === undefined ){
        res.status(400).json({ 
            error: 'You are not signed in. ' 
        }).end();
        return;
    }
    next();
};

const usernameDuplicate = async (req, res, next) =>{
    const user = await Users.findOne(req.body.username);
    if (user !== null){
        res.status(400).json({ 
            error: `User ${req.body.username} already exists. Please choose another username.`,
        }).end();
        return;
    }
    next();
};

const usernameLength = (req, res, next) =>{
    const username = req.body.username;
    if (username !== undefined && username.length < 6){
        res.status(400).json({ 
            error: 'Username should be at least 6 characters.' 
        }).end();
        return;
    }
    next();
};
const usernameType = (req, res, next) =>{
    const username = req.body.username;
    if (!username.match(alphaExp)){
        res.status(400).json({ 
            error: 'Username: Please enter only alphabets or numbers.'
        }).end();
        return;
    }
    next();
};

const passwordLength = (req, res, next) =>{
    const password = req.body.password;
    if (password !== undefined && password.length < 8){
        res.status(400).json({ 
            error: 'Password should be at least 8 characters.'
        }).end();
        return;
    }
    next();
};
const usernameUnchanged = (req, res, next) =>{
    const curName = req.session.username;
    const newName = req.body.username;

    if (curName === newName){
        res.status(400).json({ 
            error: 'The new username must not be the same as the old one.' 
        }).end();
        return;
    }
    next();
};
const passwordUnchanged = (req, res, next) =>{
    const curPassword = req.session.password;
    const newPassword = req.body.password;

    if (curPassword === newPassword){
        res.status(400).json({ 
            error: 'The new password cannot be the same as the old one.'
        }).end();
        return;
    }
    next();
};


// Rooms
const roomDuplicate = async (req, res, next) =>{
    const room = await Rooms.findOne(req.body.fname);
    if(room !== null){
        res.status(403).json({ 
            error: `Room ${req.body.fname} already exists. Please choose another room name.`,
        }).end();
        return;
    }
    next();
};

module.exports = Object.freeze({
    inputAuthorEmpty,
    authorExists,
    usernameEmpty,
    passwordEmpty,
    usernameMatch,
    passwordMatch,    
    sessionNotNull,
    sessionNull,
    usernameDuplicate,
    usernameLength,
    usernameType,
    passwordLength,
    usernameUnchanged,
    passwordUnchanged,
    roomDuplicate,
  });