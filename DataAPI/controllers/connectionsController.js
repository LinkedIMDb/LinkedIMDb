const search = require('../logic/search');

const connectionsController = {
  getData
};

// async function asyncSearch(startName, endName) {
//   let connections = await search(startName, endName)
//   return connections;
// }

async function getData(req, res, next) {
  const {startName, endName} = req.params;
  res.locals.connections = await search(startName, endName);
  next();
};






module.exports = connectionsController;
