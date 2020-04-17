const moment = require('moment');
const findAll = async (connection, params) => {
  const offset = params.currentPage * params.pageSize;
  const pageSize = params.pageSize;
  const totalPessoaQuery = await connection('pessoas').count('id as total');
  const totalPessoas = totalPessoaQuery[0].total;
  const totalPages = parseInt(totalPessoas / pageSize);

  const pessoas = await connection('pessoas')
    .select('*')
    .orderBy('id', 'desc')
    .limit(pageSize)
    .offset(offset);
  try {
    return {
      data: pessoas,
      pagination: {
        pages: totalPages,
        pageSize,
        currentPage: parseInt(params.currentPage)
      }
    };
  } catch (error) {
    return error;
  }
};

const findById = async (connection, id) => {
  const pessoasId = await connection('pessoas')
    .select(['nome', 'cargo', 'nascimento'])
    .where({ id: id });
  try {
    return pessoasId[0];
  } catch (error) {
    return error;
  }
};

const deleteOne = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection('pessoas')
      .where({ id: id })
      .del()
      .then(() => {
        try {
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
  });
};

const createPessoa = (connection, data) => {
  return new Promise((resolve, reject) => {
    let dataSplit = data.nascimento;
    let retorno = dataSplit.split('/');
    dataNascimentoLimpa = retorno[2] + '-' + retorno[1] + '-' + retorno[0];
    // console.log(dataNascimento);
    connection('pessoas')
      .insert({
        nome: data.nome,
        nascimento: `${moment(dataNascimentoLimpa).format('YYYY-MM-DD')}`,
        cargo: `${data.cargo}`
      })
      .then(() => {
        try {
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
  });
};

const updatePessoa = (connection, id, data) => {
  return new Promise((resolve, reject) => {
    let dataSplit = data.nascimento;
    let retorno = dataSplit.split('/');
    dataNascimentoLimpa = retorno[2] + '-' + retorno[1] + '-' + retorno[0];
    connection('pessoas')
      .where({ id: id })
      .update({
        nome: data.nome,
        nascimento: `${moment(dataNascimentoLimpa).format('YYYY-MM-DD')}`,
        cargo: `${data.cargo}`
      })
      .then(() => {
        try {
          return resolve();
        } catch (error) {
          return reject(error);
        }
      });
  });
};

module.exports = {
  findAll,
  findById,
  deleteOne,
  createPessoa,
  updatePessoa
};
