var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 1;
https.globalAgent.maxSockets = 1;
const cheerio = require('cheerio');
const request = require('request');

// Connecting to DB
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/user';
mongoose.connect(mongoURI);
const User = require('./models/user');

// let user = new User({
//   _id: 429,
//   name: 'Jake Boyden',
//   connections: {
//     432: {
//       _id: 432,
//       name: 'Kermit',
//       movies: ['Carwash 2, Servant Master 3'],
//       dept: ['Producer', 'Director']
//     },
//   }
// });

// user.save((err, doc) => {
//   if (err) return console.log(err);
//   return console.log('***Successful Save***\n', doc);
// })


let first = 'John';
let last = 'Smith';
let nameId;

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
      let name;
      let cache = {};
      let $ = cheerio.load(html);
      let movie = $('div.parent h3 a').text();
      let creditsTables = $('#fullcredits_content .simpleCreditsTable');
      $('.cast_list .itemprop a').each((i, elem) => {
        if (i < 10) {
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

// request(`https://www.imdb.com/title/tt6969338/fullcredits`, (err, res, html) => {
//   let $ = cheerio.load(html);
//   let movie = $('div.parent h3 a').text();
//   let creditsTables = $('#fullcredits_content .simpleCreditsTable');
//   console.log(movie)
//   $('.cast_list .itemprop a').each((i, elem) => {
//     if (i < 10) {
//       name = $(elem).find('span.itemprop').text();
//       console.log(name);
//     };
//   });
//   let offset = 0;
//   $('#fullcredits_content .dataHeaderWithBorder').each((i, elem) => {
//     let text = ($(elem).text()).split(' ');
//     if (elem.attribs.id) offset += 1;
//     if ((text[0] === 'Directed' || text[0] === 'Produced' || text[0] === 'Casting') && text[1][1] === 'y') {
//       $(creditsTables[i - offset]).find('a').each((i, elem) => {
//         name = $(elem).text()
//         console.log('***NONACTORNAMES*** ', name);
//       });
//     };
//   });
// });


async function imdbScraper(first, last) {
  let start = process.hrtime();
  let moviePromises = [];
  let res1 = await request1(first, last);
  let res2 = await request2(res1._id);
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

async function dbSaveTest(first, last) {
  let start = process.hrtime();
  let moviePromises = [];
  let res1 = await request1(first, last);
  let res2 = await request2(res1._id);
  res2.forEach(movieId => {
    moviePromises.push(request3(movieId));
  })
  let res3 = await Promise.all(moviePromises);
  res3.forEach(obj => {
    for (let _id in obj) {
      User.findOne({_id: _id}, (err, user) => {
        if (err) return console.log(err);
        if (user === null) {
          // Create new user and save
          let user = new User({
            _id: _id,
            name: obj[_id]['name'],
            connections: obj
          });
          user.save((err, doc) => {
            if (err) return console.log(err);
            return console.log('***Successful Save***\n', doc);
          });
        } else {
          // Update document and save
          user.connections = Object.assign(user.connections, obj);
          user.save((err, user) => {
            if (err) return console.log(err);
            return console.log('***Successful Update***\n', user);
          });
        };
      });
    };
  });
};

dbSaveTest('John', 'Smith');
// imdbScraper('John', 'Smith');