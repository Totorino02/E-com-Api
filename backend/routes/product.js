const multer = require("multer");
const { createProduct } = require("../backend/controllers/productController");
const product = require("../backend/models/product");
const {productStorage} = require("../utils/saveImage");
const router = require("express").Router();
const upload = multer({storage: productStorage()});
const uploadMultiple = upload.fields([{name:"images", maxCount: 8}]);

//create a new category
router.post("/new/:catId",uploadMultiple, createProduct);


module.exports = router;