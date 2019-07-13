const express = require('express');
const router = express.Router();
const mongooose = require('mongoose');
const Univer = require('../../models/Univer');

router.get('/univers', (req, res) => {
    const univers = await Univer.find({});
    if(univers){
        res.status(200).json(univers)
    } else {
        res.json({ msg: "Универов не найдено"})
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

router.post('/univers:id', async (req, res) => {
    const photo = req.body.photo;
    
})
module.exports = router;