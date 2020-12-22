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