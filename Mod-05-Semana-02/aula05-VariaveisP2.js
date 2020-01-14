let b = 20;
b = 1.0;
let name = 'Tulio';

let obj = {
  name: 'Hallan',
  obj: {
    a: 1
  }
};
let c = obj.obj.a;
console.log(c);
let key = 'obj';
let d = obj[key]['a'];
let vetor = [1, 2, 3, 4];
console.log(vetor[3]);

let funcao = func => {
  func('de dentro da funcao');
};
let funcaoCopia = funcao;
funcaoCopia(console.log);
