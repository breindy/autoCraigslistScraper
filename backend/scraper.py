import pandas as pd
from requests import get
from bs4 import BeautifulSoup as Soup

def scrapeListings():
    # test pagination
    valid_listings = set()
    pagination = 120
    
    while pagination < 600:
        # get the url and turn it into a request
        scrape_url = get('https://newyork.craigslist.org/d/cars-trucks-by-owner/search/que/cto?s=%s&hasPic=1', pagination)

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
print(len(listings))

for listing in listings:
    listing_analysis = get(listing)
    car_request = listing_analysis.text
    listing_data = Soup(car_request, 'html.parser')
    
    listing_title = listing_data.find('span', {"class": "postingtitletext"})
    listing_title_info = listing_title.find('span', {"id": "titletextonly"}).text
    
    listing_price = listing_title.find('span', {"class": "price"}).text
    
    print(listing_title_info, listing_price)
    
    car_query = listing_data.find_all('p', {"class": "attrgroup"})
    # car year
    car_year = car_query[0].find('span').find('b').text[0:4]
    print(car_year)
    
    car_make_model = car_query[0].find('span').find('b').text[5:]
    print(car_make_model)
    
    # Second attrgroup class
    car_info = car_query[1].find_all('span')
    for info in car_info:
        # print condition, odometer, title status, transmission, (optional: color)
        if "condition:" in info.text or "color:" in info.text or "odometer:" in info.text or "title status:" in info.text or "transmission:" in info.text:
            print(info.text)
    
    # listing link
    print(listing)
    
    print('-----------------------------')