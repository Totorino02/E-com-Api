const multer = require("multer");
const { createCategory, show, showAll, updateCategory, deleteCategory } = require("../controllers/categoryController");
const {categoryStorage} = require("../utils/saveImage");
const router = require("express").Router();

const upload = multer({storage: categoryStorage()});

//create a new category
router.post("/new",/*upload.single("image"),*/ createCategory);
//getAll the categories
router.get("/all", showAll);
//get a specific category and the associate products
router.get("/:catId", show);
//update a specific category 
router.put("/:catId", updateCategory);
//delete a specific category
router.delete("/:catId", deleteCategory);


module.exports = router;