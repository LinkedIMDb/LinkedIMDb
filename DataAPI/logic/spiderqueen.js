const spiders = require('./spiders/spiders.js');
const saveToDb = require('./database/datamethods.js').saveToDb;
const User = require('../models/user');

const request1 = spiders.request1;
const request2 = spiders.request2;
const request3 = spiders.request3;

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
