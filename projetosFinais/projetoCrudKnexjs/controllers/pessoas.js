const pessoas = require('../models/pessoas');
const index = async (connection, req, res) => {
  const params = {
    pageSize: req.query.pageSize || 10,
    currentPage: req.query.page || 0
  };
  const results = await pessoas.findAll(connection, params);
  //res.send(results);
  res.render('pessoas/index', { results });
};

const deleteOne = async (connection, req, res) => {
  await pessoas.deleteOne(connection, req.params.id);
  res.redirect('/pessoas');
};

const createPessoa = (req, res) => {
  res.render('pessoas/create');
};

const createProcess = async (connection, req, res) => {
  try {
    await pessoas.createPessoa(connection, req.body);
    //res.send(req.body);
    res.redirect('/pessoas');
  } catch (error) {
    res.send(`Erro`);
  }
};

const updatePessoa = async (connection, req, res) => {
  try {
    const pessoa = await pessoas.findById(connection, req.params.id);
    //res.send(pessoa);
    res.render('pessoas/update', { pessoa });
  } catch (error) {
    res.send(error);
  }
};

const updateProcess = async (connection, req, res) => {
  try {
    await pessoas.updatePessoa(connection, req.params.id, req.body);
    //res.send(req.body);
    res.redirect('/pessoas');
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  index,
  deleteOne,
  createPessoa,
  createProcess,
  updatePessoa,
  updateProcess
};
