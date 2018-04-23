/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    phone: {type: String, required: true},
 /*   imageurl: {type: String, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date},*/
});

module.exports = mongoose.model('Contact', schema);