require("dotenv").config()
const Product = require("../models/product");

const createProduct = (req,res)=>{
    if(req.body.name){
        const {name} = req.body;
        const {catId} = req.params;
        Product.find({name: name})
            .then(products =>{
                if(products.length) return res.status(401).json({error: "The Product already exixts"});
                if(req.files){
                    const images = [];
                    //console.log(req.files);
                     req.files["images"].forEach(file => {
                        images.push(file.filename);
                    });
                    const product = new Product({
                        name: name,
                        details: req.body.details,
                        prix: req.body.prix,
                        prixGrossiste: req.body.prixGrossiste,
                        quantite: req.body.quantite,
                        categoryId: catId,
                        images: images
                    })
                    product.save()
                        .then(()=> res.status(201).json({error: "Create successfully"}))
                        .catch(error => res.status(401).json({error: error.message })); 
                }
            })
            .catch(error => res.status(401).json({ error: error.message}));
    }else{
       return res.status(401).json({error: "The name field is empty"});
    }
};

const deleteProduct = (req,res) =>{

};

const updateProduct = (req, res) =>{

};

const show = (req,res) =>{

};

const showAll = (req,res) =>{

};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    show,
    showAll
}