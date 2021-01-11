const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cron = require('node-cron');

const poll = require('./utils/pollScraper');
const scraper = require('./scraper');

const Alert = require('./models/Alert');
const AlertListing = require('./models/AlertListing');

app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//Connect to MongoDB Database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Successfully connected to MongoDB database... 🎉')
});

// mongoose.createConnection(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// let db = mongoose.connection;

// db.once("open", () => console.log("Connected to database"));

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Backend Endpoint Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes/root'));
app.use('/scraper', require('./routes/scraper'));
app.use('/send-message', require('./routes/sendMessage'));
app.use('/alerts', require('./routes/alerts'));
app.use('/listings', require('./routes/alertListings'));

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});

cron.schedule('* * * * *', async () => {
    //get all list of people in alerts and call scraper with arguments passed in
    const subscribedAlerts = await Alert.find();

    //pass location, url, priceRangeMax, priceRangeMin, odometerMax to scraper (individual ones)
    subscribedAlerts.forEach(async (user) => {
        const scrapeResults = await scraper(user.location, user.odometerMax, user.priceRangeMin, user.priceRangeMax);
        
        //get the user's alertListings in AlertListing collection by phone number
        const filter = { phoneNumber: user.phoneNumber };
        const userListings = await AlertListing.find(filter);

        //convert existing user's listing to just map existing urls
        let urlListings = {};
        userListings[0].validListings.forEach((listing) => {
            urlListings[listing.url] = true;
        });

        let newListings = [];
        //check if new scrapeResults already exist in urlListings, if not add it
        scrapeResults.forEach((result) => {
            if(urlListings[result.link]){
                console.log('already exists in urlListings!');
            } else {
                console.log('new alertListing to add!');
                let newListing = {
                    url: result.link,
                    car: result.carMakeModel,
                    model: result.carMakeModel,
                    year: result.year,
                    odometer: result.odometer,
                    price: result.listingPrice,
                    color: (result.color ? result.color : 'N/A')
                }
                //update user's alertListing with the validListing object
                // AlertListing.findOneAndUpdate(
                //     { phoneNumber: userListings.phoneNumber }, 
                //     { $push: { validListings: newListing  } },
                //    function (error, success) {
                //          if (error) {
                //              console.log(error);
                //          } else {
                //              console.log(success);
                //          }
                // });

                //append to newListings to send all summary of newListings to user
                newListings.push(newListing);
                //send notification
            }
        });

    });



    console.log('running a task every minute');
});