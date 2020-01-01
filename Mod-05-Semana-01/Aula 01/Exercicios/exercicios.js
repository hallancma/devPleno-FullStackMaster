/*Os exercícios aqui propostos visam reforçar a prática da linguagem javascript de acordo com o que foi visto na primeira aula extra.*/

/*1) Dado um vetor de números, como poderia ser realizada a soma de todos os valores utilizando reduce*/
const vetor = [1, 1, 2, 3, 3, 10, 20, 10, 3];
const somatotal = (acc, item) => acc + item;
const total = vetor.reduce(somatotal);
console.log(total);

/*2) Dado um vetor de números, como poderia ser realizada a soma de todos os valores pares utilizando reduce e filter. */
const pares = item => item % 2 === 0;
const totalPares = vetor.filter(pares).reduce(somatotal);
console.log(totalPares);

/**3) Dado um vetor de números, como poderia ser realizada a soma de todos os valores ímpares utilizando reduce e filter. */
const impares = item => item % 2 != 0;
const totalImpares = vetor.filter(impares).reduce(somatotal);
console.log(totalImpares);

/**4) Dado um vetor de valores, retorne um objeto com quantas vezes cada valor está presente no vetor (dica: utilize reduce) */
const verificaOcorrencias = (agg, item) => {
  if (!agg[item]) {
    //truthy
    agg[item] = 0;
  }
  agg[item] = agg[item] + 1;
  return agg;
};
const vetorOcorrencias = vetor.reduce(verificaOcorrencias, {});
console.log(vetorOcorrencias);

/**5) Dado um vetor de valores, retorne um vetor com somente os valores únicos do vetor (aqueles que ocorrem apenas 1 vez dentro do vetor) (Dica 1: utilize reduce, filter e keys, Dica 2: escreva console.log(Object.keys()) e veja como ele poderá te ajudar neste exercício) */
const verificaOcorrenciasUnicas = (agg, val) => {
  if (!agg[val]) {
    agg[val] = {
      value: val,
      occur: 0
    };
  }
  agg[val].occur = agg[val].occur + 1;
  return agg;
};
const contagem = vetor.reduce(verificaOcorrenciasUnicas, {});
const keys = Object.keys(contagem);
const unique = keys.filter(key => contagem[key].occur === 1);
const uniqueValues = unique.map(val => contagem[val].value);
console.log(unique, contagem, uniqueValues);

/**6) Dado um vetor com números, retorne somente os números pares;*/
const numeroPares = vetor.filter(pares);
console.log(numeroPares);

/**7) Dado um vetor com números, retorne somente os números ímpares;*/
const numeroImpares = vetor.filter(impares);
console.log(numeroImpares);

/**8) Uma função é chamada da seguinte forma:
calculadora(10, '+', 20)
crie o corpo da função de forma que ela realize as 4 operações aritméticas */
const calculadora = (n1, op, n2) => {
  if (op === `+`) return n1 + n2;
  if (op === `-`) return n1 + n2;
  if (op === `*`) return n1 + n2;
  if (op === `/`) return n1 + n2;
};

console.log(calculadora(10, '+', 20));
console.log(calculadora(10, '-', 5));
console.log(calculadora(2, '*', 3));
console.log(calculadora(20, '/', 5));

/**9) Modifique a calculadora do exercício anterior para que ela receba 2 números e uma função, e realize o cálculo. Exemplo:
const soma = (num1, num2) => num1+num2
const calculadoraFn = (....) => ….
calculadoraFn(10, soma, 20) */

const soma = (n1, n2) => n1 + n2;
const subtracao = (n1, n2) => n1 - n2;
const multiplicacao = (n1, n2) => n1 * n2;
const divisao = (n1, n2) => n1 / n2;

const calculadoraFn = (n1, op, n2) => op(n1, n2);
console.log('--------//-------------');
console.log(calculadoraFn(10, soma, 20));
console.log(calculadoraFn(10, subtracao, 5));
console.log(calculadoraFn(2, multiplicacao, 3));
console.log(calculadoraFn(20, divisao, 5));
