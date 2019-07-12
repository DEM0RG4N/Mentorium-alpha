const mongoose = require('mongoose');
const schema = mongoose.Schema();

const Univer = new schema({
    name: String,
    city: String,
    country: String,
    history: String
})