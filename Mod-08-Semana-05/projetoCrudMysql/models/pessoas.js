const findAll = connection => {
  return new Promise((resolve, reject) => {
    connection.query(
      'select * from pessoas order by id desc',
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const findById = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'select *, DATE_FORMAT(nascimento, "%d/%m/%Y") as nascFormat from pessoas where id = ' +
        id,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve({});
          }
        }
      }
    );
  });
};

const deleteOne = (connection, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'delete from pessoas where id = ' + id + ' limit 1',
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

const createPessoa = (connection, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `insert into pessoas (nome,nascimento,cargo) values ('${data.nome}',DATE_FORMAT(STR_TO_DATE('${data.nascimento}', '%d/%m/%Y'), '%Y-%m-%d'),'${data.cargo}')`,
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

const updatePessoa = (connection, id, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `update pessoas set nome = '${data.nome}',nascimento = DATE_FORMAT(STR_TO_DATE('${data.nascimento}', '%d/%m/%Y'), '%Y-%m-%d'), cargo = '${data.cargo}' where id = ${id}`,
      err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  findAll,
  findById,
  deleteOne,
  createPessoa,
  updatePessoa
};
