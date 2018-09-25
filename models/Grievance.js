const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
    reply: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const GrievanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    response: {
        type: [responseSchema]
    },
    date: {
        type: Date,
        default: Date.now
      }
});


module.exports = Grievance = mongoose.model('grievance', GrievanceSchema);

