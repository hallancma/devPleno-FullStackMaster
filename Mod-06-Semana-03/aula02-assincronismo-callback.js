const fs = require('fs');
console.log('Inicio');
//console.log(fs.readdirSync('./')); //nao usar

fs.readdir('./', (err, lista) => {
  if (err) {
    console.log('erro', erro);
  } else {
    console.log(lista);
  }
});
console.log('Fim');
