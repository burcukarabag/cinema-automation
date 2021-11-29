const mongoose = require('mongoose')

function MongoService(){
    this.client = null;
    this.admin = null;
    this.connect = () => {
        return new Promise((resolve, reject)=>{
            mongoose.connect('mongodb://localhost:27017/cinema-automation-db', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, (err, mongo_client, db) => {
                if(err){
                    console.log("MongoDB Error", err)
                }else{
                    this.client = mongo_client;
                    console.log("Connected to MongoDB");
                    resolve();
                }
            })
        })
    }
}

var instance = new MongoService();

module.exports = instance;