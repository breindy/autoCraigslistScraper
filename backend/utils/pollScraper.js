const Alert = require('../models/Alert');
const AlertListing = require('../models/AlertListing');

const scraper = require('./scraper');

exports.poll = async () => {
    console.log('im currently polling something...');
}

exports.pollScraper = async () => {
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
                AlertListing.findOneAndUpdate(
                    { phoneNumber: userListings.phoneNumber }, 
                    { $push: { validListings: newListing  } },
                   function (error, success) {
                         if (error) {
                             console.log(error);
                         } else {
                             console.log(success);
                         }
                });

                //append to newListings to send all summary of newListings to user
                newListings.push(newListing);
                //send notification to user's phone number with summarized listings
                //FORMAT:

                //return object with user's phone number and user's new listings

            }
        });
        // console.log('new listings: ', newListings);
        return Promise.resolve({ phoneNumber: user.phoneNumber });
        // return new Promise((resolve) => {
        //     resolve({ phoneNumber: user.phoneNumber, newListings });
        // });
        
    });
}