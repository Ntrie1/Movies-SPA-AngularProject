const express = require('express');
const router = express.Router();
const movieModel = require('../models/movieModel');


router.get('/', async (req,res)=>{
    
    const allMovies = await movieModel.find();

    res.json(allMovies)
})

router.post('/create', async (req,res)=>{
    const movieData = {
        ...req.body,
        // owner: req.user._id,
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