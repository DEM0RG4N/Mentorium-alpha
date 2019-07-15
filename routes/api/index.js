const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Univer = require('../../models/Univer');

// url/api/univers/univers
// to get data of all univers
router.get('/univers', async (req, res) => {
    const univers = await Univer.find({});
    if(univers){
        res.status(200).json(univers)
    } else {
        res.json({ msg: "Универов не найдено" })
    }
});

// url/api/univers:id
// to get univercity landing data
router.get('/univers:id', async (req, res) => {
    const univer = await Univer.findOne({ id: req.body.id });

    if(univer){
        res.status(200).json(univer);
    } else {
        res.status(404);
    }
});

// url/api/univers POST
// to create univercity data
router.post('/univers', async (req, res) => {
    //getting data from client form
    try {
        let newUniver = new Univer({
            photo: req.body.photo,
            name: req.body.name,
            city: req.body.city,
            country: req.body.country,
            image: req.body.image,

            requirements: req.body.requirements,
            history: req.body.history,
            statisctics: req.body.statisctics,
            benefits: req.body.benefits,

            faculties: req.body.faculties,
            priceForLiving: req.body.priceForLiving,
            priceForEducation: req.body.priceForEducation,
            briefInfo: req.body.briefInfo
        });

        univercity = await newUniver.save();
        return res.json(univercity);
    } catch (err) {
        console.log(err);
    }
})
module.exports = router;