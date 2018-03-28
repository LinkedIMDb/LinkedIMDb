var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;
const cheerio = require('cheerio');
const request = require('request');

let first = 'John';
let last = 'Smith';
let nameId;

function request1(first, last) {
  return new Promise(resolve => {
    request(`http://www.imdb.com/search/name?name=${first}+${last}`, (err, res, html) => {
      if (err) return console.log(err);
      let $ = cheerio.load(html);
      nameId = $('.lister-item-image a')[0].attribs.href.slice(6)
      resolve(nameId);
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
        if (i < 10) arr.push(elem.attribs.href.slice(7, 16));
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
      let cache = {};
      let $ = cheerio.load(html);
      let creditsTables = $('#fullcredits_content .simpleCreditsTable');
      $('.cast_list .itemprop a').each((i, elem) => {
        if (i < 10) cache[elem.attribs.href.slice(6,15)] = {'Department': 'Actor'};
      });
      $('#fullcredits_content .dataHeaderWithBorder').each((i, elem) => {
        let text = ($(elem).text()).split(' ');
        if (elem.attribs.id) offset += 1;
        if ((text[0] === 'Directed' || text[0] === 'Produced' || text[0] === 'Casting') && text[1][1] === 'y') {
          $(creditsTables[i - offset]).find('a').each((i, elem) => {
            cache[elem.attribs.href.slice(6,15)] = {'Department': text[0]}
          });
        }
      });
      resolve(cache);
    })
  });
};

async function imdbScraper(first, last) {
  let start = process.hrtime();
  let moviePromises = [];
  let res1 = await request1(first, last);
  let res2 = await request2(res1);
  res2.forEach(movieId => {
    moviePromises.push(request3(movieId));
  })
  let res3 = await Promise.all(moviePromises);
  let allIds = [];
  let masterPromises = [];
  res3.forEach(obj => {
    let ids = Object.keys(obj);
    allIds = allIds.concat(ids);
  });
  allIds.forEach(id => {
    masterPromises.push(request2(id));
  });
  let res4 = await Promise.all(masterPromises);
  console.log('***res4***\n', res4);
  let merged = [].concat.apply([], res4);
  let round2 = [];
  merged.forEach(movieId => {
    round2.push(request3(movieId));
  });
  console.log('***RIGHT BEFORE ROUND 2***');
  try {
    res5 = await Promise.all(round2);
  } catch(e) {
    console.log(e);
    console.log('***ERROR HERE***');
  }

  let count = 0;
  res5.forEach((obj, i) => {
    console.log('================');
    console.log('***INDEX***', i);
    count += Object.keys(obj).length;
  });
  console.log(count);
  let finish = process.hrtime(start);
  console.log(finish);
};

imdbScraper('John', 'Smith');