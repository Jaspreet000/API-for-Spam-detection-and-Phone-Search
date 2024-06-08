const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'RegUsers', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);
