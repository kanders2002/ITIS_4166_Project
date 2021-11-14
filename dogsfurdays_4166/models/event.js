const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String, required: [true, 'title is required']}, 
    topic: {type: String, required: [true, 'topic is required']},
    details: {type: String, required: [true, 'details are required'],
        minLength: [10, 'the details should have at least 10 characters']},
    location: {type: String, required: [true, 'location is required']},
    date: {type: String, required: [true, 'date is required']},
    startTime: {type: String, required: [true, 'start time is required']},
    endTime: {type: String, required: [true, 'end time is required']},
    hostName: {type: String, required: [true, 'host name is required']},
    image: {type: String, required: [true, 'image is required']}
},
{timestamps:true}
);

//collection name is events in the database
module.exports = mongoose.model('Event', eventSchema);

/*const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const{ObjectId} = require('mongodb');

let events; //instance of the Collection class
exports.initCollection=(db)=>{
    events = db.collection('events');
}

exports.find = () => events.find().toArray();

exports.findById = id => events.findOne({_id: ObjectId(id)});

exports.save = (event) => events.insertOne(event);

exports.updateById = (id, newEvent) => 
events.findOneAndUpdate({_id: ObjectId(id)}, 
{$set: {
    name: newEvent.name, 
    topic: newEvent.topic,
    details: newEvent.details,
    location: newEvent.location,
    date: newEvent.date,
    startTime: newEvent.startTime,
    endTime: newEvent.startTime,
    hostName: newEvent.hostName,
    image: newEvent.image
}});

exports.deleteById = function(id) {
    let index = events.findIndex(story =>story.id === id)
    if(index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
}*/