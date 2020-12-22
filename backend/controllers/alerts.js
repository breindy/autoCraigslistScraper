//import alerts model
const Alert = require('../models/Alert');

exports.newAlert = async (req, res) => {
    const { phoneNumber, location, car, model, odometerMin, odometerMax, priceRangeMin, priceRangeMax } = req.body;
    
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
        const savedAlert = await newUserAlert.save();
        res.send(200).send(savedAlert);
    } catch (error){
        res.status(400).send(error);
    }
}

exports.deleteAlert = (req, res) => {
    res.send('Delete Alert for User in DB Collection Endpoint!');
}