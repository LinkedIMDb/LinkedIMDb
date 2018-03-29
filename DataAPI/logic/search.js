const request1 = require('./spiders/spiders.js').request1;
const getInfo = require('./database/datamethods.js').getInfo;
const User = require('../models/user');


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
    return path;
  }
  else console.log('Not Found');
}

module.exports = searchBFS;
