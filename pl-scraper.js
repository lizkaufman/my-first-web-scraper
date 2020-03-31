//TO RUN: in terminal, node pl-scraper.js

//require in axios to let us fetch and cheerio
const axios = require('axios');
const cheerio = require('cheerio');

//url we want to scrape:
const url =
  'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

//use axios to visit page; behaves like fetch and gives back a promise
axios(url)
  .then(res => {
    //normally fetch would be a json; this however is just an html doc, so we don't need to extract it/parse it
    const html = res.data;
    const $ = cheerio.load(html); //similar to jquery; make variable out of $ to use it similarly to document.querySelector; can hand it selector we want it to find
    //console.log(html); //prints out all the html in the console
    const statsTable = $('.statsTableContainer > tr'); //hands cheerio the specific class of table we're scraping and selects all children that are rows in it (looks in the html for anything that matches this selector); gives us an object
    //console.log(statsTable); //prints everything that matches the selector in the console
    //statsTable.each(item => console.log(item)); //object that cheerio gives us has an each method that gives back as first perameter the index of each thing in the object
    //statsTable.each(item => console.log(statsTable[item])); //now it gives us the data for each indexed table row

    const topScorers = [];

    statsTable.each(function() {
      //needs to be function() instead of ()=>; arrow functions have lexical this, so takes this from where it's defined rather than where it's passed, which will make this not work!
      //want to know rank, player name, nationality, and how many goals scored
      //want to turn the html into a json object with this info
      const rank = $(this) //$(this) to represent the element... could also do (i,element)=>{} at top and use $(element) as can't use the $(this) w/ fat arrow as mentioned above
        .find('.rank > strong') //used dev tools to find out the classname and contents of what I wanted and put the selectors in here
        .text(); //.find is another cheerio method - definition in the docs! But use the selectors in the html, and because it acts like jquery, can use .text() instead of .innerText()
      const playerName = $(this)
        .find('.playerName > strong')
        .text();
      const nationality = $(this)
        .find('.playerCountry')
        .text();
      const goalsScored = $(this)
        .find('.mainStat')
        .text();

      topScorers.push({ rank, playerName, nationality, goalsScored }); //pushes each rank key value pair object into the empty topScorers array
    });
    console.log(topScorers);
  })
  .catch(console.error); //shorter way of saying error => console.error(error)
