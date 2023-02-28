const mongoose = require('mongoose');


const User=new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true , unique: true},
    contact:{ type: Number, required: true },
    password:{ type: String, required: true },
    cart:{type: Array},
    order:{type: Array}
   
})

const model=mongoose.model('user',User);
module.exports=model