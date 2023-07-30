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

    image: {
        type: String,
        required: true,
    },

    date:{
        type: String,
        required: true,
    },

    genre: {
        type: String,
        required: true
    },

    upVotes: {
        type: Number,
        default: 0
    },

    downVotes: {
        type:Number,
        default: 0
    },

    bookmarkedBy: { 
        type: ObjectId,
        ref: 'User'
    }, 

    userId: {
        type: ObjectId,
        ref: "User"
    }
    
    
})

module.exports = mongoose.model('Movie', movieSchema)
