//const pessoas = require('../models/pessoas');
const index = async (connection, req, res) => {
  //const results = await pessoas.findAll(connection);
  //res.send(results);
  res.render('projetos/index');
};

module.exports = {
  index
};
