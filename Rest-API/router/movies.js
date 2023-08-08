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


router.put('/:movieId/bookmark',auth(), async (req, res)=>{
    const { movieId } =  req.params;
    const userId = req.user?._id;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }

    const movie = await movieModel.findById(movieId);
    const user = await userModel.findById(userId);

    
    if (!user.movies) {
        user.movies = [];
    }
    
    const isMovieBookmarked = user.movies.some((m) => m._id.toString() === movieId.toString());
    
    if (isMovieBookmarked){
        return res.status(400).json({ error: 'Movie already bookmarked' });
      }

    user.movies.push(movie); 
    await user.save();
  

    // if(user.movies?._id == movie._id) return;
    // user.movies.push(movie); 
    res.status(200).json({ message: 'Movie bookmarked successfully' });
    


})


  router.put('/removeBookmark', auth(), async (req, res) => {
    const { movieId } = req.body; // Assuming the movieId is sent in the request body
  
    if (!movieId) {
      return res.status(400).json({ error: 'Movie ID not provided' });
    }
  
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the movie is bookmarked by the user
      const isMovieBookmarked = user.movies.some((m) => m._id.toString() === movieId.toString());
  
      if (!isMovieBookmarked) {
        return res.status(400).json({ error: 'Movie is not bookmarked by the user' });
      }
  
      // Remove the movie from the user's bookmarkedMovies array
      user.movies = user.movies.filter((m) => m._id.toString() !== movieId.toString());
      await user.save();
  
      return res.status(200).json({ message: 'Movie removed from bookmarks successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });


 
module.exports = router;