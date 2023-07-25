const jwt = require("jsonwebtoken");

const User = require("../models/users");

const auth = async (req, res, next) =>{
    try{
        // preleviamo il token dalla header della richiesta
        const token = req.header("Authorization").replace("Bearer ", "");
        // verifichiamo la correttezza del token
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)
        //controllo se esiste un utente con l'id presente nel token
        const user = await User.findOne({_id : decoded._id, "tokens.token" : token})
        if(!user){
            throw new Error();
        }
        // aggiunge le proprieta` user e token alla richiesta
        req.user = user;
        req.token = token
        next();
    
    }catch(e){
        res.status(401).send({error: "Please authenticate"})
    }
};
module.exports = auth;