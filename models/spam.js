const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpamSchema = new Schema({
    phone: { type: String, required: true },
    markedBy: { type: Schema.Types.ObjectId, ref: 'RegUsers', required: true }
});

module.exports = mongoose.model('Spam', SpamSchema);
