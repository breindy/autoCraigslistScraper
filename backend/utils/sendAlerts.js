const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.send = async (phoneNumber, listings) => {
    console.log('sending new listings to subscribed user..');
    client.messages
    .create({
        body: 'Automated autoCraigslistAPI Message, please ignore.',
        from: '+12517584665',
        to: '+18454808608'
    })
    .then(message => console.log(message));
}