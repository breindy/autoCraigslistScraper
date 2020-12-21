const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//Connect to MongoDB Database
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, () => {
    console.log('Successfully connected to MongoDB database...')
});

//Backend Endpoint Routes
app.use('/', require('./routes/root'));
app.use('/scraper', require('./routes/scraper'));
app.use('/send-message', require('./routes/sendMessage'));
app.use('/alerts', require('./routes/notificationAlert'));

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})