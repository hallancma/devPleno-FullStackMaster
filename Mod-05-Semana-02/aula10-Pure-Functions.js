// pure function

const somar = (n1, n2) => {
  if (n1 > n2) {
    return n1 - n2;
  }
  return n2 - n1;
};
const media = (n1, n2) => somar(n1, n2) / 2;
console.log(somar(20, 20));
console.log(media(30, 20));
