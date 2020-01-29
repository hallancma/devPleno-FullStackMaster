function teste1() {
  console.log('opa');
  teste2('calling from teste 1');
}
function teste2(param) {
  console.log(param);
}

teste1();
