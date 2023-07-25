const Booking = require("../models/bookings");


exports.createBooking = function (req, res) {
    try {
        const newBooking = new Booking({ ...req.body });
        newBooking.save();
        res.send(newBooking)
    } catch (err) {
        res.status(400).send(err)
    }
}

// get all user bookings 
exports.getBookings = async function (req, res) {
    try {
        const { bookings } = await req.user.populate("bookings")

        //Process all the players in paralle
        await Promise.all(bookings.map(async (booking) => {
            await booking.populate("departureFlight")
            if(booking.returnFlight)
            await booking.populate("returnFlight")
          }));
          
        res.status(200).send(bookings)
    } catch (err) {
        res.status(400).send(err)
    }
}
