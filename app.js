const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("ejs");
require("dotenv").config();
const path = require("path")

const AuthRouter = require("./routes/auth");
const CategoryRouter = require("./routes/category");
const ProductRouter = require("./routes/product");
const BasketRouter = require("./routes/basket");
const PayRouter = require("./routes/buy");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, UPDATE, DELETE, ");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    next();
});

app.set("views", './views');
app.set("view engine", 'ejs');
app.engine('ejs', require('ejs').__express);

//mongodb connection
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log("Database connected !"))
    .catch((error) => console.log(error));

//entry point for all conserne users
app.use(express.static(__dirname + '/views/'));

//routes
app.use("/api/user", AuthRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", ProductRouter);
app.use("/api/basket", BasketRouter);
app.use("/api/payment", PayRouter);

app.get("/", (req, res)=>{
    res.render('login',{
        loggin: "now we are logged in"
    });
});

app.listen(port, () => console.log(`Server listen on ${port}...`));