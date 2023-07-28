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

    await movieModel.create({movieData});
    
  
})


 
module.exports = router;