const cheerio = require('cheerio');
const request = require('request');

request('http://imdb.com', (err, res, html) => {
  if (err) return console.log(err);
  let $ = cheerio.load(html);
  console.log(html);
})