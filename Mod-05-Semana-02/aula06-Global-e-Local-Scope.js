// global scope
// local

const scopeGlobal = 1;

function teste() {
  // local scope #1
  const var0 = 20;
  console.log(scopeGlobal);
  function outroTeste() {
    // scope #2
    const var1 = 10;
    console.log(var0, var1);
  }
  outroTeste();
}
// if (var0 === 20) {
//   //scope #3
//   const scope3 = 1122;
// }
//console.log(scope3);
teste();
for (let i = 0; i < 5; i++) {
  console.log(i);
}
