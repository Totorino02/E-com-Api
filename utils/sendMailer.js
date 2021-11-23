const mailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");
require("dotenv").config();

const UserVerification = require("../models/userVerification");

const transporter = mailer.createTransport({
    service : "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.USER_PASS
    }
});

const sendMailer = ({_id, name, email}, res) =>{
    //generate the uniqueString
    const uniqueString = uuidv4()+_id;
    const currentUrl = "http://localhost:5000/api/user/verification";

    const mailOptions = {
        from : process.env.EMAIL_USER,
        to: email,
        subject: "Email verification",
        html: `<p>Mr/Mme ${name} votre requette d'inscription à été reçu avec succes.</p>
        <p>Si on sait écouter, non seulement on s'attire la sympatie de tout le monde, mais au bout de quelques temps, 
        on fini par avoir apprit quelque chose</p>
        <p><a href="${currentUrl}/${_id}/${uniqueString}">cliquer ici </a>pour valider votre compte.</p>
        <p>Node.js est une plateforme logicielle libre en JavaScript, orientée vers les applications réseau évènementielles 
        hautement concurrentes qui doivent pouvoir monter en charge. Elle utilise la machine virtuelle V8, la librairie libuv 
        pour sa boucle d'évènements, et implémente sous licence MIT les spécifications CommonJS</p>
        <p>merci pour la confiance !</p><img src="cid:china" />`,
        attachments: [{
            filename: 'china.jpg',
            path: process.cwd()+"/images/china.jpg",
            cid: 'china' 
        }]
    };
    const exipredAt = new Date()
    //hashed uniqueString
    const salt = bcrypt.genSaltSync(10);
    bcrypt.hash(uniqueString, salt)
        .then((hashedUniqueString) =>{
            const userVerification = new UserVerification({
                userId : _id,
                uniqueString: hashedUniqueString,
                createdAt : Date.now(),
                expiredAt: Date.now() + 216000
            });
            //save the userVerification
            userVerification.save()
                .then(() =>{
                    transporter.sendMail(mailOptions)
                        .then(() => res.status(201).json({message: "create successfully"}))
                        .catch(() => res.status(400).json({message: "Please try again 1 "}))
                })
                .catch( error => {
                    transporter.sendMail(mailOptions)
                        .then(() => res.status(201).json({message: "create successfully"}))
                        .catch(() => res.status(400).json({message: "Please try again 1 "}));
                    //res.status(400).json({message: "please retry error when you try to save informations 1"})
                });
        })
        .catch( error => res.status(400).json({message: "please retry error when you try to save informations 2"}));
};

module.exports = sendMailer;