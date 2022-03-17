require("dotenv").config();
const multer = require("multer");
const path = require("path");

const categoryStorage = ()=>{
    return multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join(process.cwd(), "images", `categoryImages`));
        },
        filename: (req, file, cb)=>{
            cb(null, Date.now()+"-"+file.originalname);
        }
    });
}
const productStorage = ()=>{
    return multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null, path.join(process.cwd(), "images", `productImages`));
        },
        filename: (req, file, cb)=>{
            cb(null, Date.now()+"-"+file.originalname);
        }
    });
}

module.exports = {categoryStorage, productStorage};