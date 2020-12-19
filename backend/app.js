const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes/root'))

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})