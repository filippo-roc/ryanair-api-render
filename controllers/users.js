const User = require("../models/users");

exports.createUser = async function (req, res) {
    try {
        //user data
        const firstname = req.body.firstname[0].toUpperCase() + (req.body.firstname.trim()).slice(1);
        const lastname = req.body.lastname[0].toUpperCase() + (req.body.lastname.trim()).slice(1);
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        const birthday = req.body.birthday.trim();

        //check the validity of the values
        if (firstname.length === 0)
            throw new Error("Nome non valido");
        if (lastname.length === 0)
            throw new Error("Cognome non valido");
        if (!email.includes("@"))
            throw new Error("L'email deve contenere: @");
        if (password.length < 8)
            throw new Error("Password troppo corta");
        if (birthday.length < 8) {
            throw new Error("Data di nascita non valida");
        }

        //create an object with the data to save  
        const userData = { firstname, lastname, email, password, birthday };

        // create the user
        const user = new User(userData);
        if (!user) {
            throw new Error("Email già in uso")
        }
        // save
        await user.save();

        const token = await user.generateAuthToken();
        res.status(401).send({user, token})
    } catch (error) {
        console.log('problema con la creazione utente :', error.message);
        res.status(400).send(error)
    }
}


exports.login = async function (req, res) {
    try {
        // check if the user exists
        const email = req.body.email.trim();
        const password = req.body.password;
        const user = await User.findByCredentials(email, password);

        // generate a token
        const token = await user.generateAuthToken();
        res.send({user,token})
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message })
    }
}

exports.getUser = async function(req,res){
    try{
        const {userId} = req.body;
        const user = await User.findOne({_id : userId});
        res.status(200).send(user);
    }catch(err){
        console.log(err);
        res.status(400).send({message: err.message});
    }
}