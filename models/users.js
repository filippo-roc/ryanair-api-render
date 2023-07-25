require("../utils/mongoose");

const mongoose = require("mongoose");
const { Schema } = mongoose;

const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email must be unique"],
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Email non valida");
        }
    },
    birthday: {
        type: Date,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error("Data di nascita non valida");
            }
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password"))
                throw new Error("Non può essere contenuta la parola password all'interno della password")
        }
    },
    cart: [{
        type: Schema.Types.ObjectId,
        ref: "Flights"
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    

},{
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
});
//creazione dato virtuale
userSchema.virtual("bookings", {
    ref : "Booking",
    localField : "_id",
    foreignField : "owner"
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id : this._id.toString()}, `${process.env.JWT_SECRET}`)
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
}

//definisco un metodo sul modello per effettuare il login
userSchema.statics.findByCredentials = async function (email, password) {
    // cerco l'utente avente l'email descritta
    const user = await User.findOne({ email });
    const errorMessage = "Credenziali errate";
    if (!user) throw Error(errorMessage);
    //controllo la password con quella dell'utente trovato
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error(errorMessage);
    // se non si sono verificati errori restituisco l'utente
    return user
}

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 8)
    //inivio l'email di benvenuto : 
    next();
});

userSchema.on("error", (err) => {
    if (err)
        console.log(err);
})


const User = mongoose.model("User", userSchema);

module.exports = User;



