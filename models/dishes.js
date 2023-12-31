const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type : Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        require: true,
        min: 0
        
    },
    featured: {
        type: Boolean,
        default:false
    },
    comments : [ commentSchema ]
}, {
    timestamps: true
});

//dishSchema.index({ name: 1 }); // Create index

var Dishes = mongoose.model('Dish', dishSchema);
module.exports = Dishes;

