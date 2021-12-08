const mongoose = require('mongoose');

function MongoService(){
    this.connect = () => {
        return new Promise((resolve, reject)=>{
            mongoose.connect('mongodb://localhost:27017/cinema-automation-db', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                retryWrites: false
            }, (err, mongo_client, db) => {
                if(err){
                    console.log("MongoDB Error", err)
                    reject(err);
                }else{
                    console.log("Connected to MongoDB");
                    resolve();
                }
            })
        })
    }
}

var instance = new MongoService();

module.exports = instance;