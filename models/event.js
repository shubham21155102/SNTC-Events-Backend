const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    ClubName:{
        type:String,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Venue:{
        type:String,
        required:true
    },
    Topic:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports = mongoose.model('event',EventSchema);