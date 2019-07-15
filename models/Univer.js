const mongoose = require('mongoose');
const schema = mongoose.Schema;

const univerSchema = new schema({
    photo: String,
    name: String,
    city: String,
    country: String,
    requirements: String,
    history: String,
    statisctics: String,
    benefits: String,
    faculties: String,
    priceForLiving: String,
    priceForEducation: String,
    briefInfo: String,
    image: String
});

const Univer = mongoose.model("Univer", univerSchema);

module.exports = Univer;