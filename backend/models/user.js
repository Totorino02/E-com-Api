const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {type:String, required:true},
  surname: {type: String, required:true},
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  sexe: {type:Boolean, required:true},
  phoneNumber: {type:Number, required:true},
  dateOfBirth: {type:Date, required:true},
  isAdmin: {type:Boolean, default:false},
  isVerified: {type:Boolean, default:false},
  profile: {type: String, required: false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);