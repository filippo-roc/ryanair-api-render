const express = require('express');

const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

const app = express();
app.use(cors(corsOptions));

const port = process.env.PORT || 8000
app.use(express.json()) // bisogna configurare express per eleborare json

const flightRoutes = require("./routes/flight");
const userRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
app.use(flightRoutes);
app.use(userRoutes);
app.use(bookingRoutes);

app.get("/", (req, res)=> {
    res.send("hello world");
})
app.listen(port);