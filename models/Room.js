const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
        "room_name": {
            type: String,
            required: true,
        },
        "member": {
            type: String,
            required: false,
        },
        "reading": {
            type: Object,
            required: false,
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Room", RoomSchema);
