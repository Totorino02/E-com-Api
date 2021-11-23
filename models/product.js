const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    details: {type:String, required:false},
    prix: {type: Number, required:true},
    prixGrossiste: {type: Number, required:false},
    quantite: {type: Number, required:true},
    categoryId : {type: mongoose.Types.ObjectId, required:true},
    images: {type: [String], required:true},    
    isDeleted: {type: Boolean, default: false}
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model("Product", productSchema);
