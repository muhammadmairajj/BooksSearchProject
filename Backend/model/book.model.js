const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//  Author Schema:
const authorSchema = new Schema({
    name : {type : String, required : true},
    year : {type : Number}
}, {
    timestamps : true
});

const authorModel = mongoose.model("Author", authorSchema);

//  Book Schema:
const bookSchema = new Schema({
    name : {type : String, required : true},
    year : {type : Number},
    author : {
        type : mongoose.Schema.Types.ObjectId,
        refL : "Author"
    },
    description : {type : String},
    pages : {type : Number},
    size : {type : String},
    price : {type : Number, required : true},
    discount : {type : Number, default : 0},
    imageUrl : {type : String, required : true},
    publicId : {type : String}
}, {
    timestamps : true
});

module.exports = mongoose.model("Book", bookSchema);