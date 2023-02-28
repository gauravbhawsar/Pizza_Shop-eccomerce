const mongoose = require('mongoose');


const Product=new mongoose.Schema({
    name:{ type: String, required: true },
   
    price:{ type: Number, required: true },
    path:{ type: String, required: true }
   
})

const model=mongoose.model('product',Product);
module.exports=model