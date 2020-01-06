const fs = require('fs');
const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
const readDir = caminho =>
  new Promise((resolve, reject) => {
    fs.readdir(caminho, (err, arquivos) => {
      if (err) {
        reject('erro ao executar', err);
      } else {
        resolve(arquivos);
      }
    });
  });

const readDiretorios = caminho =>
  new Promise((resolve, reject) => {
    fs.readdir(caminho, (err, arquivos) => {
      if (err) {
        reject('erro ao executar', err);
      } else {
        resolve(arquivos);
      }
    });
  });

module.exports = {
  readFile,
  writeFile,
  readDir,
  readDiretorios
};
