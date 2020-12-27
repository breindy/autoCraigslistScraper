//import alerts model
const Alert = require('../models/Alert');
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
        const result = await scrapeListings();
        console.log('result: ', result);
        // scrapeListings().then(results => console.log('results: ', results));
        // console.log('newUserAlert: ', newUserAlert);
        // res.status(200).send({
        //     "newAlertListings": result, 
        // });
        res.sendStatus(200);
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