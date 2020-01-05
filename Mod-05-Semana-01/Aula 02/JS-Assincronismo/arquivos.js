//const fs = require('./fs-promise');
// const readFile = fs.readFile;
// const writeFile = fs.writeFile;
const { readFile, writeFile } = require('./fs-promise');

//callback hell
// fs.readFile('assincronismo.js', (err, data) => {
//   fs.writeFile('assincronismo-copy.js', data, err => {
//     console.log('Arquivo copiado');
//   });
// });

//promisse + async/await

// readFile('assincronismo.js')
//   .then(data => writeFile('copia-promise.js', data))
//   .then(() => console.log('arquivo copiado'))
//   .catch(err => console.log(err));

//async/await
const copyFile = async () => {
  console.log('Ola async/await');
  try {
    const data = await readFile('assincronismo.js');
    await writeFile('copy-async-await.js', data);
    //console.log(String(data));
    console.log('arquivo lido e escrito');
  } catch (err) {
    console.log('erro', err);
  }
};
copyFile().then(() => console.log('Fim async await'));
