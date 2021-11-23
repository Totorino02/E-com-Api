const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
    name: {type:String, required:true, unique:true},
    image: {type:String, required:true, unique:true},
    isDeleted: {type: Boolean, default: false}
});

module.exports = mongoose.model("Category",categorySchema);