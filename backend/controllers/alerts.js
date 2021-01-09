//import alerts model
const Alert = require('../models/Alert');
const AlertListing = require('../models/AlertListing');
const scrapeListings = require('../scraper.js');

exports.newAlert = async (req, res) => {
    const { phoneNumber, location, odometerMax, priceRangeMin, priceRangeMax } = req.body;
    //TODO: Add new model VALIDATION

    //Create a new alert model to save into mongodb collection (new document)
    const newUserAlert = new Alert({
        phoneNumber,
        location,
        odometerMax,
        priceRangeMin,
        priceRangeMax
    });

    try {
        const savedAlert = await newUserAlert.save();

        //send newUserAlert car search based on conditions set
        //TODO: pass in arguments into scrapeListings from newUserAlert
        const result = await scrapeListings(location, odometerMax, priceRangeMin, priceRangeMax);

        //Save to alertListings schema pass in newUserAlert phone number and results listin
        let firstListing = result[0];
        // console.log('firstListing: ', firstListing);
        let listing = {
            url: firstListing.link,
            car: firstListing.carMakeModel,
            model: firstListing.carMakeModel,
            year: firstListing.year,
            odometer: firstListing.odometer,
            price: firstListing.year,
            color: (firstListing.color ? firstListing.color : 'N/A')
        }

        const newAlertListings = new AlertListing({
            phoneNumber: newUserAlert.phoneNumber,
            validListings: listing,
        });
        // const savedAlertListings = await newAlertListings.save();

        // for(let i = 1; i < result.length; i++){
        //     let listing = {
        //         url: result[i].link,
        //         car: result[i].carMakeModel,
        //         model: result[i].carMakeModel,
        //         year: result[i].year,
        //         odometer: result[i].odometer,
        //         price: result[i].year,
        //         color: (result[i].color ? result[i].color : 'N/A')
        //     }
        //        AlertListing.findOneAndUpdate(
        //     { _id: newAlertListings._id }, 
        //     { $push: { validListings: listing  } },
        //    function (error, success) {
        //          if (error) {
        //              console.log(error);
        //          } else {
        //              console.log(success);
        //          }
        // });
        // }
        res.status(200).send({
            "newAlertListings": result,
        });
    } catch (error){
        res.status(400).send(error);
    }
}

exports.deleteAlert = async (req, res) => {
    //Given a user phone number, delete document from alert collection
    const { phoneNumber } = req.body;

    try {
        const phoneNumberExists = await Alert.find({phoneNumber: req.body.phoneNumber});
        if(phoneNumberExists){
            const deletedAlert = await Alert.deleteMany({phoneNumber: req.body.phoneNumber});
            return res.status(200).send('📱 Phone Number Deleted');
        }

    } catch (error){
        return res.status(400).send(error);
    }
    
}