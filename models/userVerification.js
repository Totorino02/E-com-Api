const mongoose = require("mongoose");

const userVerificationSchema = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required:true},
    uniqueString:{type: String, required:true},
    createdAt: {type: Date, required: true},
    expiredAt: {type: Date, required: true}
});

module.exports = mongoose.model("UserVerification", userVerificationSchema);