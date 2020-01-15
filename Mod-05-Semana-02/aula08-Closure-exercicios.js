function test() {
  //console.log(`a `, a);

  var a = 1;
  const foo = function() {
    return 2;
  };
  console.log(`foo `, foo());
}
test();

var a = 1;

function someFunction(number) {
  function otherFunction(input) {
    return a;
  }

  a = number;

  return otherFunction;
}

var firstResult = someFunction(9);
var result = firstResult(2);
console.log(`firstResult`, firstResult);
console.log(`result`, result);

var result = someFunction(9)(2);
console.log(result);

//3) Qual o resultado? Explique sua resposta.
var fullname = 'Tulio Faria';
var obj = {
  fullname: 'Jose Silva',
  prop: {
    fullname: 'Nome Sobrenome',
    getFullname: function() {
      return this.fullname;
    }
  }
};

console.log(obj.prop.getFullname());

var test = obj.prop.getFullname;

console.log(test.bind(obj.prop)());

//4) O que sairá no console neste exemplo a seguir:
var a = 1;
function b() {
  a = 10;
  return;
  function a() {}
}
b();
console.log(a);
