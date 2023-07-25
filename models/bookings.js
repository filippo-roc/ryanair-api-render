require("../utils/mongoose");

const mongoose = require("mongoose");
const { Schema } = mongoose;

//FIXME COMPLETA LO SCHEMA DELLA PRENOTAZIONE

const bookingSchema = new Schema({
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    departureFlight : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Flight"
    },
    returnFlight : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Flight"
    },
    passengers :{
        type : Array,
        required : true
    }
    
});

const User = mongoose.model("Booking", bookingSchema);

module.exports = User;



