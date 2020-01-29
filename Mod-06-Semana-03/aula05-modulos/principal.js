const modulo1 = require('./modulo1');
const leftPad = require('left-pad');
const nomeEspaco = leftPad('Hallan', 20);

console.log(modulo1.a);
console.log(modulo1.teste);
console.log(modulo1.cumprimento(`Hallan`));
console.log(nomeEspaco);
