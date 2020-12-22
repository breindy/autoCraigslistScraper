const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;

exports.test = (req, res) => {
    res.send('Send message endpoint');
    client.messages
    .create({
        body: 'Automated autoCraigslistAPI Message, please ignore.',
        from: '+12517584665',
        to: '+18454808608'
    })
    .then(message => console.log(message));
}

exports.autoMessage = (req, res) => {
    const twiml = new MessagingResponse();
    if(req.body.Body == 'ALERTINFO'){
        //TODO: get auto listing updates from alertListing from phone number and display
        twiml.message(`You auto car listing info:`);
    } else if (req.body.Body == 'UNSUBSCRIBE' || req.body.Body == 'STOP' || req.body.Body == 'NO'){
        twiml.message(`You have now been unsubscribed to future auto listing alerts. We're sad to see you go 🥺, hope we see again next time!`);
    } else {
        twiml.message(`Welcome to autoCraigslistScraper\n\nYou have subscribed to receive auto car listings from Craiglists. To know more details about what auto listings you have subscribed to, reply with ALERTINFO.\n\nIf you'd like to unsubscribe to stop receving future auto listings, please reply STOP or UNSUBSCRIBE.\n\nOtherwise, continue to stay with us for your auto listing updates! Thank you!`);
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}