// imports to create a schema/model
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// create posts schema -- // moved from app.js //
const VotingCandidate = new mongoose.Schema({
    id: {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    name: {
        type: String
    },
    logoUrl: {
        type: String
    },
    votes: {
        type: Number
    }
});

module.exports = mongoose.model('VotingCandidate', VotingCandidate);