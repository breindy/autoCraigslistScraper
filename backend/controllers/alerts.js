//import alerts model
const Alert = require('../models/Alert');
const AlertListing = require('../models/AlertListing');
const scrapeListings = require('../scraper.js');

exports.newAlert = async (req, res) => {
    const { phoneNumber, location, car, model, odometerMin, odometerMax, priceRangeMin, priceRangeMax } = req.body;
    //TODO: Add new model VALIDATION

    //Create a new alert model to save into mongodb collection (new document)
    const newUserAlert = new Alert({
        phoneNumber,
        location,
        car,
        model,
        odometerMin,
        odometerMax,
        priceRangeMin,
        priceRangeMax
    });

    try {
        // const savedAlert = await newUserAlert.save();

        //send newUserAlert car search based on conditions set
        //TODO: pass in arguments into scrapeListings from newUserAlert
        // const result = await scrapeListings();
        // res.status(200).send({
        //     "newAlertListings": "hahha", 
        // });
        //TODO: Save to alertListings schema pass in newUserAlert phone number and results listing
        let listing = {
            url: 's212312312315sdfsdfdfs',
            car: 'mercedes',
            model: 'c123',
            year: 2014,
            odometer: 18899,
            price: 12324,
            color: 'black',
        }
        const newAlertListings = new AlertListing({
            phoneNumber: newUserAlert.phoneNumber,
            validListings: listing,
        });
        // console.log(savedAlertListings);
        const savedAlertListings = await newAlertListings.save();

        //update newly created alertListing to the rest of validListings array
        let moreListing = {
            url: 'djlsdflsdjflsjdflsjf',
            car: 'honda',
            model: 'donkey',
            year: 2001,
            odometer: 99999,
            price: 55555,
            color: 'maroon',
        }

       AlertListing.findOneAndUpdate(
            { _id: newAlertListings._id }, 
            { $push: { validListings: moreListing  } },
           function (error, success) {
                 if (error) {
                     console.log(error);
                 } else {
                     console.log(success);
                 }
        });
        res.status(200).send({
            "newAlertListings": savedAlertListings,
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