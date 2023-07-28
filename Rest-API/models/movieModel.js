const mongoose =  require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const movieSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    releaseDate:{
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true
    },

    bookmark: {
        type: ObjectId,
        ref: 'User'
    } 
    
})

module.exports = mongoose.model('Movie', movieSchema)
