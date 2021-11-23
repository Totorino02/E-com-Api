const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const basketSchema = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required:true},
    products :{
        type: [{prodId: mongoose.Types.ObjectId,price: Number, quantity: Number}], 
        required:false, 
        default:[]
    }
});

module.exports = mongoose.model("Basket", basketSchema);
