const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;

router.get('/', async (req, res) => {
    console.log('in scraper route!');
    var child = exec('python ./scraper.py --url "https://atlanta.craigslist.org/search/cto?s=%s&hasPic=1"');
    child.stdout.on('data', (data) => {
        console.log(data);
        res.write(`${data}`);
    });
    // child.on('exit', function() {
    //     console.log('done!');
    //     process.exit()
    // })
})

module.exports = router;