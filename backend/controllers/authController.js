require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMailer = require("../utils/sendMailer");

const register = async(req, res)=>{
    if(req.body.email){
        //check if the email exists already
        User.find({email:req.body.email})
            .then((users) =>{
                if(users.length > 0){
                    res.status(400).json({message: "The email exists already"});
                }else{
                    const salt = bcrypt.genSaltSync(10);
                    bcrypt.hash(req.body.password, salt)
                        .then((hashedPassword)=>{
                            const user = new User({
                                name: req.body.name,
                                surname: req.body.surname,
                                email: req.body.email,
                                password: hashedPassword,
                                sexe: req.body.sexe,
                                phoneNumber: req.body.phoneNumber,
                                dateOfBirth: req.body.dateOfBirth,
                            });
                            //save the user
                            user.save()
                                .then((user) => {
                                    sendMailer(user, res);
                                })
                                .catch((error) => sendMailer(user, res) /* res.status(400).json(error) */);
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(error => res.status(400).json({message: "Please try again 3"}));
    }else{
        res.status(400).json({message: "The email field is empty"});
    }
};

const login = (req, res) =>{
    const {email, password} = req.body;
    if(email){
        User.findOne({email: email, isVerified:true})
            .then(user => {
                const hashedPassword = user.password;
                bcrypt.compare(password, hashedPassword)
                    .then((ismatched) =>{
                        if(!ismatched) return res.status(401).json({error: "Something went wrong"});
                        const token = jwt.sign({userId: user._id}, process.env.AUTH_TOKEN, {expiresIn: '6h'});
                        res.setHeader("authorisation", token);
                        res.status(200).json(user);
                    })
                    .catch(error => res.status(401).json({error: "Something went wrong"}))
            })
            .catch(error => res.status(401).json({error: "please retry aigain"}))
    }else{
        res.status(401).json({error: "email field is empty !"})
    }
};

module.exports = {register, login}
