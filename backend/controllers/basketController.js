const Basket = require("../models/basket");
const Product = require("../models/product");
require("dotenv").config();

const createBasket = (req, res)=>{
    if(req.params.userId){
        const {userId} = req.params;
        Basket.findOne({userId: userId})
            .then(basket =>{
                if(basket) return res.status(200).json({message : "The basket already exists"});
                const newBasket = new Basket({userId: userId})
                newBasket.save()
                    .then(()=> res.status(201).json({message: "Created successfully"}))
                    .catch((error)=> res.status(401).json({error: "Something went wrong", errorMessage: error.message}))
            })
            .catch((error)=> res.status(401).json({error: "Something went wrong", errorMessage: error.message}))
    }else{
        return res.status(401).json({error: "Something went wrong"});
    }
};

const updateBasket = (req, res)=>{
    if(req.params.userId && req.params.productId){
        const {userId,productId} = req.params;
        const {quantity} = req.body;
        //find the basket by the userId
        Basket.findOne({userId: userId})
            .then(basket =>{
                const {products} = basket;
                //search if the basket is empty
                if(products.length){
                    /**
                     * search the product by the product id if true we update products
                     * if true we update the quantity other wise add the product
                     */ 
                    const product = products.filter(product => product.prodId == productId)[0]
                    if(product){
                        product.quantity = quantity;
                        Basket.updateOne({userId: userId},{products: basket.products})
                            .then((data) => res.status(201).json(data))
                            .catch(error => res.status(401).json({error: "Something went wrong", errorMessage: error.message}));
                    }else{
                        Product.findById(productId)
                            .then((produit) =>{
                                const newProd = {
                                    prodId: productId,
                                    quantity: quantity,
                                    price: produit.prix
                                };
                                products.push(newProd);//push the new in basket prods
                                Basket.updateOne({userId: userId},{products: products})
                                    .then((data) => res.status(201).json(data))
                                    .catch(error => res.status(401).json({error: "Something went wrong", errorMessage: error.message}));
                            })
                            .catch(error => res.status(401).json({error: "Something went wrong", errorMessage: error.message}))
                    }
                }else{
                    //in this case the basket is empty add the new product in
                    Product.findById(productId)
                        .then((produit) =>{
                            const newProd = {
                                prodId: productId,
                                quantity: quantity,
                                price: produit.prix
                            };
                            basket.products.push(newProd);
                            Basket.updateOne({userId: userId},{products: newProd})
                                .then((data) => res.status(201).json(data))
                                .catch(error => res.status(401).json({error: "Something went wrong 1", errorMessage: error.message}));
                        })
                        .catch(error => res.status(401).json({error: "Something went wrong 2", errorMessage: error.message}))
                }
            })
            .catch(error => res.status(401).json({error: "Something went wrong 3", errorMessage: error.message}));
    }else{
        return res.status(401).json({error: "Invalid path retry again"});
    }
};

module.exports = {updateBasket, createBasket};