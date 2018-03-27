const cheerio = require('cheerio');
const request = require('request');

let first = 'John';
let last = 'Smith';
let nameId;

request(`http://www.imdb.com/search/name?name=${first}+${last}`, (err, res, html) => {
  if (err) return console.log(err);
  let arr = [];
  let $ = cheerio.load(html);
  console.log($('.lister-item-image a')[0].attribs.href);
  nameId = $('.lister-item-image a')[0].attribs.href.splice(6);
})

request(`http://www.imdb.com/filmosearch?explore=title_type&role=nm0808774&ref_=filmo_ref_typ&sort=moviemeter,asc&mode=detail&page=1&title_type=movie`, (err, res, html) => {
  if (err) return console.log(err);
  let arr = [];
  let $ = cheerio.load(html);
  $('.lister-item-header a').each((i, elem) => {
    if (i < 10) {
      console.log(elem.attribs.href);
    }
  });
})

request(`https://www.imdb.com/title/tt0036872/fullcredits`, (err, res, html) => {
  if (err) return console.log(err);
  let arr = [];
  let $ = cheerio.load(html);
  $('.cast_list .itemprop a').each((i, elem) => {
    if (i < 10) {
      console.log(elem.attribs.href);
    }
  });
  $('#fullcredits_content .dataHeaderWithBorder').text().each((i, elem) => {
    console.log(elem);
  });
  $('#fullcredits_content .simpleCreditsTable').each((i, elem) => {
    console.log(elem);
  });
})