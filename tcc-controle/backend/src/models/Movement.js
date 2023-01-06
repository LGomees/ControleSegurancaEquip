const mongoose = require('mongoose');

const MovementSchema = new mongoose.Schema({
    responsibleWithDraw: String,
    equipament: String,
    dateHourWithdraw: String,
    emergency: String,
    patrimony: String,
    responsibleDevolution: String,
    dateHourDevolution: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Movement',MovementSchema);