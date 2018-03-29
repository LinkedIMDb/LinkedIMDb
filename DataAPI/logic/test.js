const spiders = require('./spiders/spiders.js');
const User = require('../models/user');

const request1 = spiders.request1;
const request2 = spiders.request2;
const request3 = spiders.request3;

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
