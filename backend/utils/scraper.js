const { once } = require('events'); 
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { execSync } = require('child_process');
//Pass in appropriate arguments into scraper
/**
 * --url type: string
 * --car type: string
 * --model type: string
 * --odometer type: integer
 * --priceRange type: integer
 * --color type: string
 */

const scrapeListings =  async (location, odometerMax, priceRangeMin, priceRangeMax) => {
    return new Promise((resolve, reject) => {
        exec('python ./scraper.py --url "https://atlanta.craigslist.org/search/cto?s=%s&hasPic=1" --location "atlanta" --odometerMax 123123 --priceMin 3333 --priceMax 5555',
        (error, stdout, stderr) => {
            if(error){
                console.warn(error);
            }
            resolve(stdout? JSON.parse(stdout) : stderr);

        })
    })
}

module.exports = scrapeListings