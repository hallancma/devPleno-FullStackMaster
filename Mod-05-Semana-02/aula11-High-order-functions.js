//HOF
function teste(acao) {
  acao();
}
teste(() => console.log('opa'));

const valores = [1, 2, 3, 4];

const dobro = item => item * 2;
const somar = (acu, valor) => valor + acu;
valores.forEach(valor => console.log(valor));
const impares = valor => valor % 2 === 0;
const soma = valores
  .filter(impares)
  .map(dobro)
  .reduce(somar, 0);

console.log(dobro);
console.log(soma);
