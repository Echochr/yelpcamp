const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database Connected!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!!")
        console.log(err)
    })

// const sample = array => array[Math.floor(Math.random() * array.length)];
const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomNum = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '609d00519da3403d4c8445e7',
            location: `${cities[randomNum].city}, ${cities[randomNum].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, consectetur? Molestiae, perferendis. Corporis accusantium nisi culpa laboriosam reiciendis ipsum quidem excepturi? Commodi aliquam laboriosam provident nulla? Suscipit recusandae illo laudantium?',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomNum].longitude,
                    cities[randomNum].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtnxug2ye/image/upload/v1620987937/YelpCamp/wo06c9f2sdequudtyigr.jpg',
                    filename: 'YelpCamp/wo06c9f2sdequudtyigr'
                },
                {
                    url: 'https://res.cloudinary.com/dtnxug2ye/image/upload/v1620987937/YelpCamp/xso2rvjzhp2k14zywxmn.jpg',
                    filename: 'YelpCamp/xso2rvjzhp2k14zywxmn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database Connection Closed");
});