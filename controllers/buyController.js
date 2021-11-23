const Buy = require("../models/buy");
const User = require("../models/user");
const Basket = require("../models/basket");
const Product = require("../models/product");

const pay = async(req, res)=>{
    if(req.params.userId){
        const {userId} = req.params;
        const {typeOfPayment} = req.body;
        Basket.findOne({userId: userId})
            .then(basket =>{
                //console.log(basket);
                const {products} = basket;
                const productList = [];
                const sold = 0;
                products.forEach( product =>{
                    Product.findById(product.prodId)
                        .then(prod =>{
                            //console.log(prod.name, product.quantity)
                            productList.push({product: prod.name,quantity: product.quantity})
                            sold = sold+ prod.prix;
                        })
                        .catch(()=> console.log("#error"));
                });
                setTimeout(() =>{
                    const buy =  new Buy({
                        userId: userId,
                        typeOfPayment: typeOfPayment,
                        products: productList,
                        sold: sold
                    });
                    console.log(buy);
                }, 10000)
            })
            .catch(console.log("# error 2"));
            //console.log(productList)
    }else{

    }
};

module.exports = pay;