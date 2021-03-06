const router = require("express").Router();
const {updateBasket, createBasket} = require("../controllers/basketController");

//create a basket
router.post("/:userId", createBasket);
//update a basket
router.post("/:userId/:productId", updateBasket);


module.exports = router;