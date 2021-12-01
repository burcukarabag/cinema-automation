const express = require('express');
const Mongo = require('./utils/Mongo');
const app = express()

//import routers
var cityRouter = require('./routes/CityRouter');
var disctrictRouter = require('./routes/DistrictRouter');
var categoryRouter = require('./routes/CategoryRouter');
var cinemaRouter = require('./routes/CinemaRouter');
var filmRouter = require('./routes/FilmRouter');
var chairRouter = require('./routes/ChairRouter');
var customerRouter = require('./routes/CustomerRouter');
var publishRouter = require('./routes/PublishRouter');
var saloonRouter = require('./routes/SaloonRouter');
var reservationRouter = require('./routes/ReservationRouter');

//for body parse
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((error, req, res, next) => {
    return res.status(500).json({ error: error.toString() });
  });
  
app.use('/cities', cityRouter);
app.use('/districts', disctrictRouter);
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