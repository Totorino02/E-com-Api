require("dotenv").config();
const UserVerification = require("../models/userVerification");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const verification = async(req, res) =>{
    const {id, hashedId} = req.params;
    User.findById(id)
        .then(user =>{
            if(!user){
                return res.status(400).json({error: "Invalid Credentials 1"});
            }else{
                const {_id} = user;
                UserVerification.findOne({userId:_id},(error,userVerification ) =>{
                    if(error) return res.status(400).json({error: "Invalid Credentials 2"});
                    const {uniqueString, expiredAt} = userVerification;
                        //test if the uniqueString matched with the hashedId
                        if(expiredAt > Date.now()){
                            bcrypt.compare(hashedId, uniqueString)
                                .then((ismatched) =>{
                                    if(!ismatched) return res.status(400).json({error: "Invalid Credentials 2"});
                                    User.updateOne({_id: _id}, {isVerified: true}, (error, data ) =>{
                                        console.log(data)
                                        if(error) throw error /* res.status(401).json({error: "Invalid Credentials 4"}) */;
                                            UserVerification.deleteOne({userId:_id}, (error, data ) =>{
                                                if(error) throw error /* return res.status(400).json({error: "Invalid Credentials 5"} )*/;
                                                return res.status(200).json({message: "delete successfully"});
                                            })
                                    })
                                })
                                .catch(() => res.status(401).json({error: "Invalid Credentials 3"}))
                        }else{
                            return res.status(400).json({error: "délais expiré"});
                        }
                })
            }
        })
        .catch(error => res.status(400).json({error: "Invalid Credentials 7"}));
};

module.exports = verification;