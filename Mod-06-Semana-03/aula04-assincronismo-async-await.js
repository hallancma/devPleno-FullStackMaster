function tempo(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => res(ms), rej);
  });
}
const fs = require('fs');

function readdir(path) {
  return new Promise((res, rej) => {
    fs.readdir('./', (err, lista) => {
      if (err) {
        rej(err);
      } else {
        res(lista);
      }
    });
  });
}

const teste = async () => {
  try {
    for (let index = 0; index < 5; index++) {
      const ms = await tempo(4000);
      const lista = await readdir('./');
      const lista2 = await readdir('./');
      console.log(lista);
      console.log(lista2);
    }

    //const ms = await tempo(4000);
    //console.log(`terminou em ${ms}`);
  } catch (error) {
    console.log(error);
  }
};

console.log(teste());
