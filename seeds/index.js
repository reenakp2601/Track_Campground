const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',{
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
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price =Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author:'6614fa12eb0f48b586f62fb2',
            location :`${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description:'cool campground with fun activities',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dkrzishy7/image/upload/v1713720535/YelpCamp/zlhlp3ficpmxonssvumg.png',
                  filename: 'YelpCamp/zlhlp3ficpmxonssvumg',
                },
                {
                  url: 'https://res.cloudinary.com/dkrzishy7/image/upload/v1713720535/YelpCamp/fnpdfniv48a5a1tkudxo.png',
                  filename: 'YelpCamp/fnpdfniv48a5a1tkudxo',
                },
                {
                  url: 'https://res.cloudinary.com/dkrzishy7/image/upload/v1713720535/YelpCamp/vh0i8k9ujf3ir9k3bbit.png',
                  filename: 'YelpCamp/vh0i8k9ujf3ir9k3bbit',
                }
              ]
              
        })
        await camp.save();
    } 
}

seedDB().then(()=>{
    mongoose.connection.close();
})