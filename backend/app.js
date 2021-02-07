const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cron = require('node-cron');

const poll = require('./utils/pollScraper');
const scraper = require('./utils/scraper');
const message = require('./utils/sendAlerts');

app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//Connect to MongoDB Database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
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

//Potentially poll every 4 hours
cron.schedule('* * * * *', () => {
    //Poll scraper and send newListings as new SMS Message
    // const result = await poll.pollScraper();

    // console.log('polling result: ', result);

    //Send message via Twilio
    // message.send(123123123, 'newListing');
});