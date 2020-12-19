const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();

const sys = require('util');
const exec = require('child_process').exec;
// const process = spawn('python', ["./test.py"]);

const PORT = 3333;

app.use('/', require('./routes/root'));

app.use('/scraper', require('./routes/scraper'));
// (req, res) => {
//     res.sendFile(__dirname + '/views/index.html');
// }

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})