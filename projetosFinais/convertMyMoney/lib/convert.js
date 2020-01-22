const convert = (cotacao, quantidade) => {
  return cotacao * quantidade;
};

const toManey = valor => {
  return parseFloat(valor).toFixed(2);
};

const isNumber = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports = {
  convert,
  toManey,
  isNumber
};
