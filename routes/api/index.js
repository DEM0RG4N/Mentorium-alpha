const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Univer = require('../../models/Univer');

// url/api/univers/univers
router.get('/univers', async (req, res) => {
    const univers = await Univer.find({});
    if(univers){
        res.status(200).json(univers)
    } else {
        res.json({ msg: "Универов не найдено" })
    }
});

router.get('/univers:id', async (req, res) => {
    const univer = await Univer.findOne({ id: req.body.id });

    if(univer){
        res.status(200).json(univer);
    } else {
        res.status(404);
    }
});

router.post('/univers', async (req, res) => {
    //getting data from client form
    try {
        let newUniver = new Univer({
            photo: req.body.photo,
            name: req.body.name,
            city: req.body.photo,
            country: req.body.photo,

            requirements: req.body.photo,
            history: req.body.photo,
            statisctics: req.body.photo,
            benefits: req.body.photo,

            faculties: req.body.photo,
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