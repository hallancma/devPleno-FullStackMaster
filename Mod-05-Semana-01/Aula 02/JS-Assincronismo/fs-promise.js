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
module.exports = {
  readFile,
  writeFile
};
