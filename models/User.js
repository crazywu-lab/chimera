const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
        "username": {
            type: String,
            required: true,
        },
        "password": {
            type: String,
            required: true,
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("User", UserSchema);
