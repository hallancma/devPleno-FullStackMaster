console.log(1);

setTimeout(() => {
  console.log('Ola em 2 segundos');
}, 2000);
let count = 0;
let count2 = 0;
let interval = setInterval(() => {
  console.log('Ola');
  count++;
  if (count > 5) {
    clearInterval(interval);
  }
}, 1000);

let interval2 = setInterval(() => {
  console.log('Ola 2');
  count2++;
  if (count2 > 6) {
    clearInterval(interval2);
  }
}, 1000);
console.log(2);
