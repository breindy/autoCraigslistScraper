const exec = require('child_process').exec;
//Pass in appropriate arguments into scraper
/**
 * --url type: string
 * --car type: string
 * --model type: string
 * --odometer type: integer
 * --priceRange type: integer
 * --color type: string
 */
const scrapeListings = () => {
    var child = exec('python ./scraper.py --url "https://atlanta.craigslist.org/search/cto?s=%s&hasPic=1"');
    child.stdout.on('data', (data) => {
        //return formatted json data of valid listings
        console.log(data);
    });
}

module.exports = scrapeListings