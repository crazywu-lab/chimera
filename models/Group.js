const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema(
    {
        // note that we don't have a short_id field, by default mongoDB creates this field, which is our Primary Key
        "group_name": {
            type: String,
            required: true,
        },
        "creator_id": {
            type: Schema.Types.ObjectId, 
            ref: "User",
            required: true,
        },
        "members_num":{
            type: Number,
            required: true,
        },
        "members": {
            type: Array,
            required: true,
        },
        "currentWeek": {
            type: Number,
            required: true,
        },
        "rooms": {
            type: Array,
            required: false,
        },
    }
);

// mongoose will automatically create the collection for our DB
module.exports = mongoose.model("Group", GroupSchema);
