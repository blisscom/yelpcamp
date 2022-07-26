const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: '62d3e70f95d0d47ffd8b1302',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum molestias, quisquam  sit amet consectetur adipisicing elit. Earum molestias,',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      images:
        [
          {
            url: 'https://res.cloudinary.com/drjxhpvjs/image/upload/v1658314306/YelpCamp/jo3zkkbv7gmuds9ujapn.jpg',
            filename: 'YelpCamp/jo3zkkbv7gmuds9ujapn'

          },
          {
            url: 'https://res.cloudinary.com/drjxhpvjs/image/upload/v1658314306/YelpCamp/d6luq0s7xx2m5jnc1ixf.jpg',
            filename: 'YelpCamp/d6luq0s7xx2m5jnc1ixf'

          },
          {
            url: 'https://res.cloudinary.com/drjxhpvjs/image/upload/v1658314307/YelpCamp/dboysb0sh6mvozkbrpen.jpg',
            filename: 'YelpCamp/dboysb0sh6mvozkbrpen'

          }
        ]

    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})