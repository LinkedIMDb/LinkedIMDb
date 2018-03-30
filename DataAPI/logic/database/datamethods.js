// Connecting to DB
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost/user';
// const mLabURI = 'mongodb://superuser:supersecret@ds127899.mlab.com:27899/linkimdb'
// mongoose.connect(mLabURI);
const User = require('../../models/user');


const dbMethods = {
  getInfo,
  saveToDb,
  getId
}

function getId(name) {
  return new Promise (resolve => {
    User.findOne({ "name" : { $regex : new RegExp(name, "i") } }, (err, user) => {
      if (err) return console.log(err);
      console.log('user', user);
      if (user === null)  return resolve(null);
      return resolve(user._id);
    })
  })
}

// function getId(name) {
//   User.findOne({name}, (err, user) => {
//     if (err) return console.log(err);
//     console.log('user', user);
//     if (user === null)  return null;
//     return user._id;
//   })
// }

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

module.exports = dbMethods;
