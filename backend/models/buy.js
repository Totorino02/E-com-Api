const mongoose = require("mongoose");

const BuySchema = mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required:true},
    typeOfPayment: {type: String , enum: ["PAYIZI", "PAYGATE", "PAYPAL", "PERFECT MONey"], uppercase: true},
    products: {type: [{product:String, quantity: Number}], required:true},
    sold: {type: Number, required: true}
});

module.exports = mongoose.model("Buy",BuySchema);