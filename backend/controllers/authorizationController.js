require("dotenv").config();
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) =>{
    const token = req.header("authorization");
    if(!token) res.status(401).json({error: "Access Dined"});
    const ismatched = jwt.verify(token, process.env.AUTH_TOKEN);
    if(!ismatched) res.status(401).json({error: "Access Dined"});
    next();
}

module.exports = authorization;