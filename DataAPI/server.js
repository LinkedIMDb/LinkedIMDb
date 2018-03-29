var http = require('http');
var https = require('https');
http.globalAgent.maxSockets = 9999;
https.globalAgent.maxSockets = 9999;
const cheerio = require('cheerio');
const request = require('request');

// Connecting to DB
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/user';
mongoose.connect(mongoURI);
const User = require('./models/user');

let first = 'John';
let last = 'Smith';
let nameId;
let layers = 4;

function saveToDb(arr) {
  arr.forEach(obj => {
    for (let _id in obj) {
      User.findOne({_id: _id}, (err, user) => {
        if (err) return console.log('***ERROR IN SAVE***', err);
        if (user === null) {
          // Create new user and save
          let user = new User({
            _id: _id,
            name: obj[_id]['name'],
            connections: obj
          });
          user.save((err, doc) => {
            if (err) return console.log(err);
            return;
          });
        } else {
          // Update document and save
          console.log('***USER CONNECTIONS PRE***\n', user.connections);
          let newConnections = Object.assign({}, user.connections, obj);
          user.connections = newConnections;
          console.log('***USER CONNECTIONS POST***\n', user.connections);
          user.save((err, user) => {
            if (err) return console.log('***ERROR IN UPDATE***', err);
            return;
          });
        };
      });
    };
  });
}

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

async function imdbScraper(first, last) {
  let start = process.hrtime();
  let moviePromises = [];
  let res1 = await request1(first, last);
  let res2 = await request2(res1._id);
  res2.forEach(movieId => {
    moviePromises.push(request3(movieId));
  })
  let res3 = await Promise.all(moviePromises);
  saveToDb(res3);
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
  res5 = await Promise.all(round2);
  saveToDb(res5);  
  
  // let allIdsBig = [];
  // let masterPromisesBig = [];
  // res5.forEach(obj => {
  //   let ids = Object.keys(obj);
  //   allIdsBig = allIdsBig.concat(ids);
  // });
  // allIdsBig.forEach(id => {
  //   masterPromisesBig.push(request2(id));
  // });

  // let res6 = await Promise.all(masterPromisesBig);
  // console.log('***res6***\n');
  // let mergedBig = [].concat.apply([], res6);
  // let round3 = [];
  // mergedBig.forEach(movieId => {
  //   round3.push(request3(movieId));
  // });
  // console.log('***RIGHT BEFORE ROUND 3***');
  // res7 = await Promise.all(round3);
  // await saveToDb(res7);

  let count = 0;
  res5.forEach((obj, i) => {
    console.log('================');
    console.log('***INDEX***', i);
    count += Object.keys(obj).length;
  });
  console.log('***NUMBER OF RECORDS***\n', count);
  let finish = process.hrtime(start);
  console.log('***TIME***\n', finish);
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

          });
        } else {
          // Update document and save
          console.log('***USER CONNECTIONS PRE***\n', user.connections);
          user.connections = Object.assign(user.connections, obj);
          console.log('***USER CONNECTIONS POST***\n', user.connections);          
          user.save((err, user) => {
            if (err) return console.log(err);
            return console.log('***Successful Update***\n', user);
          });
        };
      });
    };
  });
};

async function searchBFS(name1, name2) {
  let i;  
  let j = 0;
  let k = 0;
  let rem = 2;
  let found = false;

  let queue;
  let thisCache;
  let otherCache;

  let queueFront = [];
  let cacheFront = {};

  let queueBack = [];
  let cacheBack = {};

  let name1Arr = name1.split(' ');
  let name2Arr = name2.split(' '); 

  console.log(name1Arr);
  console.log(name2Arr);

  let nameId1 = await request1(name1Arr[0], name1Arr[1]);
  let nameId2 = await request1(name2Arr[0], name2Arr[1]);

  console.log('***IN HERE***');
  console.log(nameId1);
  queueFront.push(nameId1._id);
  queueBack.push(nameId2._id);

  cacheFront[nameId1._id] = true;
  cacheBack[nameId2._id] = true;

  console.log('***BEGIN LOOP***');
  while (found === false && (j <= queueFront.length - 1 && k <= queueBack.length -1)) {
    console.log('***IN WHILE LOOP***');
    // If mod is even use queueFront, else use queueBack
    if (rem % 2 === 0) {
      queue = queueFront;
      thisCache = cacheFront;
      otherCache = cacheBack;
      i = j;
      j += 1;
    } else {
      queue = queueBack;
      thisCache = cacheBack;
      otherCache = cacheFront;
      i = k;
      k += 1;
    }
    console.log('***ID TO SEARCH***\n', queue[i]);
    console.log('***BEFORE AWAIT***');
    await User.findOne({_id: queue[i]})
      .then((user) => {
        console.log('***INSIDE AWAIT***');
        console.log()
        // if (err) console.log('***INSIDE ERROR***\n')
        for (let id in user.connections) {
          if (otherCache.hasOwnProperty(id)) {
            found = true;
            otherCache[queue[i]] = id;
            break;
          }
          if (!thisCache.hasOwnProperty(id)) {
            queue.push(id);
            thisCache[id] = queue[i];
          }
        };
        rem += 1;
      });
    console.log('***AFTER AWAIT***');
  };
  console.log('***END LOOP***');
  if (found === true) {
    let id = queue[i];
    let id1 = queue[i];
    let id2 = queue[i];    
    let arr1 = [];
    let arr2 = [];
    console.log('Found');
    console.log(cacheBack);

    while (cacheFront[id1] !== true) {
      console.log('***FRONT CACHE***')
      arr1.push(cacheFront[id1]);
      id1 = cacheFront[id1];
    }
    arr1.reverse();
    while (cacheBack[id2] !== true) {
      console.log('***BACK CACHE***')      
      arr2.push(cacheBack[id2]);
      id2 = cacheBack[id2];
    }
    arr1.push(id);
    arr2.reverse();

    // console.log('***PATH***\n', path);
    let path1 = await getInfo(arr1);
    let path2 = await getInfo(arr2);
    path2.reverse();

    let path = path1.concat(path2);
    console.log('***HAPPY***\n', path);
    console.log('PATH SHOWN');
  }
  else console.log('Not Found');
}

async function getInfo(arr) {
  let results = [];
  arr.unshift(arr[0]);
  await User.findOne({_id: arr[0]})
  for (let i = 0; i < arr.length - 1; i += 1) {
    console.log('***FOR LOOP GOING***');
    console.log(arr[i + 1]);
    await User.findOne({_id: arr[i]})
      .then((user) => {
        console.log('***IN FINDONE***')
        results.push({
          name: user.connections[arr[i + 1]].name,
          movie: user.connections[arr[i + 1]].movie,
          department: user.connections[arr[i + 1]].department
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return results;
}

// dbSaveTest('John', 'Smith');
// imdbScraper('Will', 'Smith');
console.log(searchBFS('David Ayer', 'Bing Crosby'));