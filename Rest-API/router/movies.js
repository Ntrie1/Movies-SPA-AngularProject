const express = require('express');
const router = express.Router();
const movieModel = require('../models/movieModel');
const { auth } = require('../utils');     
const { userModel } = require('../models');


router.get('/', async (req,res)=>{
    
    const allMovies = await movieModel.find();

    res.json(allMovies)
})

router.post('/create', auth(), async (req,res)=>{
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
    
  
});


router.get('/:movieId', async (req,res)=>{
    const { movieId } =  req.params;

    const movie = await movieModel.findById(movieId);
    res.json(movie);


})


router.post('/:movieId/bookmark',auth(), async (req, res)=>{
    const { movieId } =  req.params;
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

    const movie = await movieModel.findById(movieId);
    console.log('Movie:', movie);
    const user = await userModel.findById(userId);
    console.log('User:', user);

    
    if (!user.movies) {
        user.movies = [];
    }
    
    const isMovieBookmarked = user.movies.some((m) => m._id.toString() === movieId.toString());
    
    if (isMovieBookmarked) return;
    user.movies.push(movie);
    await user.save();
    console.log(user.movies)

    // if(user.movies?._id == movie._id) return;
    // user.movies.push(movie); 
    res.status(200).json({ message: 'Movie bookmarked successfully' });
    


})


 
module.exports = router;