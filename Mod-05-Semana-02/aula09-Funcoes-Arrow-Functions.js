const falar = function(palavra) {
  console.log(palavra);
};

const somar = function(n1, n2) {
  return n1 + n2;
};

const somar2 = (n1, n2) => n1 + n2;
const mediaLouca = (soma, num) => {
  soma++;
  num++;
  return soma / num;
};

const animal = (nome, grunido) => nome + ` ` + grunido();

falar(`Ola`);
console.log(somar(10, 23));
console.log(somar2(10, 10));
console.log(mediaLouca(10, 5));
console.log(animal('cachorrro', () => 'latir'));
