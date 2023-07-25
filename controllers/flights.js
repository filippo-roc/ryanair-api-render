const Flight = require("../models/flights");

const FLIGHTS_LIST = [
    "Milano",
    "Palermo"
]


exports.getFlights = async (req, res) => {
    try {
        const { departure } = req.query;
        const { destination } = req.query;
        const departureDate = req.query["departure-date"] && new Date(req.query["departure-date"]);
        
        // questa variabile conterra` la stessa data di prima con un giorno in piu` 
        let limitDate = new Date(req.query["departure-date"]);
        limitDate = limitDate.setDate(limitDate.getDate() + 1);
        console.log(limitDate)

        //if one of the fields there is not, the request is not valid  
        if (!departure || !destination || !departureDate) {
            return res.status(400).send()
        }
        //search
        const searchedFlights = await Flight.find({departureAirport : departure, destinationAirport : destination, departureDate : { $gte: departureDate, $lte: limitDate } });

        res.status(200).send(searchedFlights);
    } catch (err) {
        console.error(err.message)
        res.send(err.message)
    }
}


exports.getFlightsList = (req, res) => {
    try {
        res.status(200).send(FLIGHTS_LIST);
    } catch (err) {
        res.status(501).send();
    }
}


exports.createFlight = (req, res) => {
    try{
        const { departureAirport } = req.body;
        const { destinationAirport } = req.body;
        const { duration } = req.body;
        const { typeOfFlight } = req.body;
        const { bagsCosts } = req.body;
        const { flightNumber } = req.body;
        const { price } = req.body;
        const { placesAvaible } = req.body;
        const { departureDate } = req.body;
        const { destinationDate } = req.body;

        const flight = new Flight(req.body);
        flight.save();
        res.send(["il seguente volo `e stato salvato :" , flight])
    }catch(error){
        console.log('problema con la creazione del volo :', error.message);
        res.status(400).send(error)
    }

}
