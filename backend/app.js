const express = require('express');
const Mongo = require('./utils/Mongo');
const app = express();
require("./utils/ErrorHandler");
require("./utils/SuccessMessageHandler");

//import routers
const cityRouter = require('./routes/CityRouter');
const districtRouter = require('./routes/DistrictRouter');
const categoryRouter = require('./routes/CategoryRouter');
const cinemaRouter = require('./routes/CinemaRouter');
const filmRouter = require('./routes/FilmRouter');
const chairRouter = require('./routes/ChairRouter');
const customerRouter = require('./routes/CustomerRouter');
const publishRouter = require('./routes/PublishRouter');
const saloonRouter = require('./routes/SaloonRouter');
const reservationRouter = require('./routes/ReservationRouter');

//for body parse
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cities', cityRouter);
app.use('/districts', districtRouter);
app.use('/categories', categoryRouter);
app.use('/cinemas', cinemaRouter);
app.use('/movies', filmRouter);
app.use('/chairs', chairRouter);
app.use('/customers', customerRouter);
app.use('/sessions', publishRouter);
app.use('/saloons', saloonRouter);
app.use('/reservations', reservationRouter);

Mongo.connect().then(()=>{
    app.listen(3000, ()=>{
        console.log("Server up and running")
  
    })
})