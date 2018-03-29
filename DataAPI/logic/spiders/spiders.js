var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;
const cheerio = require('cheerio');
const request = require('request');

let nameId;
const layers = 4;


const spiders = {
  request1,
  request2,
  request3
};

function request1(first, last) {
  return new Promise(resolve => {
    let userObj = {};
    request(`http://www.imdb.com/search/name?name=${first}+${last}`, (err, res, html) => {
      if (err) return console.log(err);
      let $ = cheerio.load(html);
      nameId = $('.lister-item-image a')[0].attribs.href.slice(6)
      userObj['_id'] = nameId;
      userObj['name'] = `${first} ${last}`;
      userObj['connections'] = {};
      resolve(userObj);
    });
  });
};

function request2(nameId) {
  return new Promise(resolve => {
    request(`http://www.imdb.com/filmosearch?explore=title_type&role=${nameId}&ref_=filmo_ref_typ&sort=moviemeter,asc&mode=detail&page=1&title_type=movie`, (err, res, html) => {
      if (err) return console.log(err);
      let arr = [];
      let movieId;
      let $ = cheerio.load(html);
      $('.lister-item-header a').each((i, elem) => {
        if (i < layers) arr.push(elem.attribs.href.slice(7, 16));
      });
      resolve(arr);
    });
  });
};

function request3(movieId) {
  return new Promise(resolve => {
    request(`https://www.imdb.com/title/${movieId}/fullcredits`, (err, res, html) => {
      if (err) return console.log(err);
      let offset = 0;
      let name;
      let cache = {};
      let $ = cheerio.load(html);
      let movie = $('div.parent h3 a').text();
      let creditsTables = $('#fullcredits_content .simpleCreditsTable');
      $('.cast_list .itemprop a').each((i, elem) => {
        if (i < layers) {
          name = $(elem).find('span.itemprop').text();
          cache[elem.attribs.href.slice(6,15)] = {
            'name': `${name}`,
            'movie': `${movie}`,
            'department': 'Actor'
          };
        };
      });
      $('#fullcredits_content .dataHeaderWithBorder').each((i, elem) => {
        let text = ($(elem).text()).split(' ');
        if (elem.attribs.id) offset += 1;
        if ((text[0] === 'Directed' || text[0] === 'Produced' || text[0] === 'Casting') && text[1][1] === 'y') {
          $(creditsTables[i - offset]).find('a').each((i, elem) => {
            name = $(elem).text().slice(1, -1);
            cache[elem.attribs.href.slice(6,15)] = {
              'name': `${name}`,
              'movie': `${movie}`,
              'department': text[0]
            };
          });
        };
      });
      resolve(cache);
    })
  });
};

module.exports = spiders;
