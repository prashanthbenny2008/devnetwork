const mongoose = require('mongoose');
// const config = require('config');
const db = config.get('mongoURI');
const dotenv = require("dotenv");

const connectDB = async ()=> {
    dotenv.config();
    let mongoURI = "mongodb+srv://" + process.env.MONGO_UN + ":" + process.env.MONGO_KEY + "@" + process.env.MONGO_HOST + "/test?retryWrites=true&w=majority";
    console.log(mongoURI);
    try{
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true ,
            useFindAndModify: false
        });
        console.log('MongoDB connected...');
    }
    catch(err){
        console.error(err.message);
        
        //Exit process with failure
        process.exit(1);

    }
}
module.exports = connectDB;