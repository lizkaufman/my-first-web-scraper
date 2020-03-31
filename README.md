# My first web scraper

_31 March 2020_

During class, we built a web scraper to scrape Premier League stats off of BBC Sports. I'm no football fan, but it's still interesting to see the mechanisms behind how a web scraper works!

This is a static web scraper; for a dynamic web scraper, see my Reddit Scraper repository.

### Dependencies:

- Axios: Node library that allows us to fetch the html from the website URL
- Cheerio: Node library that lets us navigate the DOM with Node and use selectors to pull elements/text out (docs: https://cheerio.js.org/)

### How to run:

- In console, run: **node pl-scraper.js**
