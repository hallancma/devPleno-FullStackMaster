const fs = require('fs');

const readFile = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        resolve(contents.toString());
      }
    });
  });
};
const out = contents => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(contents);
      resolve();
    }, 5000);
  });
};
const writeFile = (file, contents) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

readFile('promises.js')
  .then(out)
  .then(writeFile.bind(null, 'teste.js'))
  .then(console.log('Final'));
// const resultReadFile = async () => {
//   try {
//     const readFileResult = await readFile('promises.js');
//     console.log(readFileResult);
//     await writeFile('teste.js', readFileResult);
//     console.log('Final');
//   } catch (error) {
//     console.log(error);
//   }
// };
// console.log(resultReadFile());
