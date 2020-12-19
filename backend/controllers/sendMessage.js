const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.test = (req, res) => {
    res.send('Send message endpoint');
    client.messages
    .create({
        body: 'Automated autoCraigslistAPI Message, please ignore.',
        from: '+12517584665',
        to: ''
    })
    .then(message => console.log(message));
}