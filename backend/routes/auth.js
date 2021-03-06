const router = require("express").Router();
const {login, register} = require("../controllers/authController");
const verification = require("../controllers/verificationController");
const authorization = require("../controllers/authorizationController");

//register users and send a confirmation mail
router.get("/", (req, res)=>{
    res.render('login',{
        société: "Eckover Corporation"
    })
})
router.post("/register", register );
//verify the user account
router.get("/verification/:id/:hashedId", verification );
//login the user
router.post("/login", login);

module.exports = router;