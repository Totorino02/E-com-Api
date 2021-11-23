require("dotenv").config();
const { name } = require("ejs");
const Category = require("../models/category");
const Product = require("../models/product");

const createCategory = (req,res)=>{
    if(req.body.name){
        const {name} = req.body;
        Category.find({name: name})
            .then(categories =>{
                if(categories.length){
                    return res.status(401).json({error : "The category already exists"});
                }else{
                    const category = new Category({
                        name: name,
                        image: req.file.filename
                    })
                    category.save()
                        .then(()=> res.status(201).json({message: "created successfully"}))
                        .catch(error => res.status(401).json({error : error.message}));
                }
            })
            .catch(error => res.status(401).json({error : "Something went Wrong 2"}));
    }else{
        return res.status(401).json({error : "The name field was empty"});
    }
};

const deleteCategory = (req,res) =>{
    if(req.params.catId){
        const {catId} = req.params;
        Category.findById(catId)
            .then(category =>{
                if(!category) return res.status(401).json({message: "success"});
                Category.updateOne({_id: catId}, {isDeleted: true})
                    .then(()=>{
                        Product.find({categoryId: catId})
                            .then((products) => {
                                products.forEach(product =>{
                                    Product.updateOne({_id: product._id},{isDeleted: true});
                                });
                                return res.status(401).json({message: "success"});
                            })
                            .catch(error => res.status(401).json({error: "something went wrong 1", errorMessage: error.message}));   
                    })
                    .catch((error => {
                        Category.updateOne({_id: catId}, {isDeleted: false});
                        Product.find({categoryId: catId})
                            .then((products) => {
                                products.forEach(product =>{
                                    Product.updateOne({_id: product._id},{isDeleted: true});
                                });
                                return res.status(401).json({message: "success"});
                            })
                            .catch(error => res.status(401).json({error: "something went wrong 1", errorMessage: error.message})); 
                        res.status(401).json({error: "something went wrong 2", errorMessage: error.message});
                    }))
            })
            .catch(error => res.status(401).json({error: "something went wrong 3", errorMessage: error.message}));
    }else{
        return res.status(401).json({error: "Innvalid Path"});
    }
};

const updateCategory = (req, res) =>{
    if(req.params.catId){
        const {catId} = req.params;
        const {name} = req.body;
        Category.updateOne({_id: catId},{name: name})
            .then(()=> res.status(201).json({message: "updated successfully"}))
            .catch(error => res.status(401).json({error: error.message}));
    }else{
        res.status(401).json({error: "Innvalid Path"})
    }
};

const show = (req,res) =>{
    if(req.params.catId){
        const {catId} = req.params;
        Category.findById(catId)
            .then(category =>{
                if(!category) return res.status(401).json({category:category});
                Product.find({categoryId: catId})
                    .then(products => {
                        if(!products.length) return res.status(200).json({category:category , products: products});
                        return res.status(200).json({category:category , products: products});
                    })
                    .catch(error => res.status(401).json({error: "something went wrong", errorMessage: error.message}));
            })
            .catch(error => res.status(401).json({error: "something went wrong", errorMessage: error.message}));
    }else{
        res.status(401).json({error: "Innvalid Path"})
    }
};

const showAll = (req,res) =>{
    Category.find()
        .then(categories =>{
            if(!categories.length) return res.status(200).json({message: "there is any category create one"});
            return res.status(200).json({categories});
        })
        .catch(error => res.status(401).json({error: error.message}));
};

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    show,
    showAll
}