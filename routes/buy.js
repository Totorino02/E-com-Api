const router = require("express").Router();
const pay = require("../controllers/buyController");

//pay the content of the basket
router.post("/:userId", pay);

module.exports = router;