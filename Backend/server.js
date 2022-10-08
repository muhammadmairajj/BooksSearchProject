const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./db');
const Book = require('./model/book.model');

app.use(cors());
app.use(express.json());

// Database Connected:
connectDB();

// API
// GET API:
app.get('/api/v1/books', async (req,res) => {
    try {
        const {key, page, limit} = req.query
        const skip = (page - 1) * limit
        const search = key ? {
        "$or" : [
            {name : {$regex : key, $options : "$i"}},
            {description : {$regex : key, $options : "$i"}}
        ]
    }
        : {}
        const data = await Book.find(search).populate("author").skip(skip).limit(limit);
        // const data = await Book.find(
        //     {
        //         "$or" : [
        //             {name : {$regex : key, $options : "$i"}},
        //             {description : {$regex : key, $options : "$i"}}
        //         ]
        // }
        // ).populate("author").skip(skip).limit(5)
        // console.log(data);
        res.json({
            data
        })
    }
    catch(err) {
        console.log(err);
    } 
});

const PORT  = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running at', PORT);
})