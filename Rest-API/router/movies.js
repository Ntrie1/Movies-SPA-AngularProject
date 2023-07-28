const express = require('express');
const router = express.Router();
const movieModel = require('../models/movieModel');
const { auth } = require('../utils')


router.get('/', async (req,res)=>{
    
    const allMovies = await movieModel.find().populate('userId');

    res.json(allMovies)
})

router.post('/create', auth(), async (req,res)=>{
    console.log(req.user)
    const { _id: userId } = req?.user;
    const movieData = {
        ...req.body,
        userId: userId,
    }

    try {
        const createdMovie = await movieModel.create(movieData);
        res.status(201).json(createdMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ error: 'Error creating movie' });
    }
    
  
})


 
module.exports = router;