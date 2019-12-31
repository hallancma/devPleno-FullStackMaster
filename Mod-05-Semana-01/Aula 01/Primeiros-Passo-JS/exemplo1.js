// c-like
const valor = 10;
if (valor === 10) {
  // return true;
}
let valor2 = 20;
valor2 = 30;
console.log(valor, valor2);

const objeto = {
  chave: 'valor1',
  chave2: 'valor2'
};
console.log(objeto);

const str = 'Tulio Faria - DevPleno';

const soma = function(a, b) {
  return a + b;
};
//functions are first class citizens
const calculadora = function(op, a, b) {
  return op(a, b);
};
console.log(soma(20, 20));
console.log(calculadora(soma, 30, 20));
const vetor = [1, 2, 3, 4, 5, 6];
const dobrado = vetor.map(item => {
  //return item * 2;
  return { original: item, dobrado: item * 2 };
});
console.log(dobrado);
console.log(typeof dobrado);
const dobrar = item => item * 2;
const somentePares = item => item % 2 === 0;
const pares = vetor.filter(somentePares);
const paresDobrados = vetor.filter(somentePares).map(dobrar);
console.log(pares);
console.log(paresDobrados);

const somarTotal = (acumulado, atual) => acumulado + atual;
const somatorio = paresDobrados.reduce(somarTotal, 0);
console.log(somatorio);
