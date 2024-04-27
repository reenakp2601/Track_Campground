const mongoose = require('mongoose');
const cities = require('./cities');
const pictures = require('./pictures');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
const dbURL = process.env.DB_URL;

mongoose.connect(dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open",() =>{
    console.log("Databse connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<150;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const random1 = Math.floor(Math.random()*5);
        const random2 = Math.floor(Math.random()*5);
        const price =Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
          //your user id
            author:'662cbac482a15aa0444ee4b0',
            location :`${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description:'cool campground with fun activities',
            price,
            geometry: { 
              type: 'Point',
              coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude,
               ] 
            },
            images: [
                // {
                //   url: 'https://res.cloudinary.com/dkrzishy7/image/upload/v1713720535/YelpCamp/zlhlp3ficpmxonssvumg.png',
                //   filename: 'YelpCamp/zlhlp3ficpmxonssvumg',
                // },
                // {
                //   url: 'https://res.cloudinary.com/dkrzishy7/image/upload/v1713720535/YelpCamp/fnpdfniv48a5a1tkudxo.png',
                //   filename: 'YelpCamp/fnpdfniv48a5a1tkudxo',
                // },
                // {
                //   url: 'https://res.cloudinary.com/dkrzishy7/image/upload/v1713720535/YelpCamp/vh0i8k9ujf3ir9k3bbit.png',
                //   filename: 'YelpCamp/vh0i8k9ujf3ir9k3bbit',
                // }
                 pictures[random1],
                 pictures[random2]
              ]
              
        })
        await camp.save();
    } 
}

seedDB().then(()=>{
    mongoose.connection.close();
})