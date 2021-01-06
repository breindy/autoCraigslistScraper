import argparse
import json
import pandas as pd
from requests import get
from bs4 import BeautifulSoup as Soup

# create an argumentparser object
parser = argparse.ArgumentParser(description='obtain user url')
parser.add_argument('--url', help='craigslist url to scrape with')
args = parser.parse_args()
all_listings = []

def scrapeListings():
    # test pagination
    valid_listings = set()
    pagination = 120
    url = str(args.url)
    # print(url)
    
    while pagination < 600:
        # get the url and turn it into a request
        # 'https://newyork.craigslist.org/d/cars-trucks-by-owner/search/que/cto?s=%s&hasPic=1'
        # url+'s=%s&hasPic=1'
        scrape_url = get(url, pagination)

        # make a request with the url and instantiate beautifulsoup constructor to parse the html data with
        soup_data = Soup(scrape_url.text, 'html.parser')

        # Get all the results listing

        results_query = soup_data.find_all("li", {"class": "result-row"})
        for result in results_query:
            listing_price = result.find("span", {"class": "result-price"}).text
            valid_price = listing_price[1:]
            valid_price = valid_price.replace(",", "")
            if int(valid_price) > 2000 and int(valid_price) < 6000:
                valid_listings.add(result.find("a", {"class": "result-title hdrlnk"}).get('href'))
        
        pagination += 120
            
    return valid_listings

    
listings = scrapeListings()
# print(len(listings))

for listing in listings:
    scraped_listings = {}

    listing_analysis = get(listing)
    car_request = listing_analysis.text
    listing_data = Soup(car_request, 'html.parser')
    
    listing_title = listing_data.find('span', {"class": "postingtitletext"})
    listing_title_info = listing_title.find('span', {"id": "titletextonly"}).text
    
    listing_price = listing_title.find('span', {"class": "price"}).text
    
    # print(listing_title_info, listing_price)
    scraped_listings['listingTitle'] = listing_title_info
    scraped_listings['listingPrice'] = listing_price

    car_query = listing_data.find_all('p', {"class": "attrgroup"})
    # car year
    car_year = car_query[0].find('span').find('b').text[0:4]
    # print(car_year)
    scraped_listings['year'] = int(car_year)
    
    car_make_model = car_query[0].find('span').find('b').text[5:]
    # print(car_make_model)
    scraped_listings['carMakeModel'] = car_make_model
    
    # Second attrgroup class
    car_info = car_query[1].find_all('span')
    for info in car_info:
        # print condition, odometer, title status, transmission, (optional: color)
        ## todo: REFACTOR (DRY) ##
        if "condition:" in info.text: 
            condition = info.text.replace('condition: ', '')
            scraped_listings['condition'] = condition
        if "color:" in info.text:
            color = info.text.replace('color: ', '')
            scraped_listings['color'] = color
        if "odometer:" in info.text:
            odometer = info.text.replace('odometer: ', '')
            scraped_listings['odometer'] = int(odometer)
        if "title status:" in info.text:
            title_status = info.text.replace('title status: ', '')
            scraped_listings['titleStatus'] = title_status
        if "transmission:" in info.text:
            transmission_type = info.text.replace('transmission: ', '')
            scraped_listings['transmissionType'] = transmission_type
    
    # listing link
    # print(listing)
    scraped_listings['link'] = listing
    
    all_listings.append(scraped_listings)

    # print('-----------------------------')

print(json.dumps(all_listings))
# print(all_listings)
# return all_listings
# print(len(all_listings))