const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

router.get('/', (req, res) => {
    console.log('in scraper route!');
    var child = exec('python ./scraper.py')
    child.stdout.on('data', (data) => {
        console.log(data);
        res.write(`${data}`);
        res.end(data);
    });
})

module.exports = router;