const axios = require('axios');
const getToday = () => {
  const today = new Date();
  return (
    today.getDate() + '/' + today.getMonth() + 1 + '/' + today.getFullYear()
  );
};
console.log(getToday());
const url = 'https://economia.awesomeapi.com.br/json/list/USD-BRL/1';

const dolarDia = url => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(
      response => {
        resolve(response.data);
      },
      erro => {
        reject('', erro);
      }
    );
  });
};

const verificaCotacao = async () => {
  try {
    const cotacaoDia = await dolarDia(url);
    return parseFloat(cotacaoDia[0].bid).toFixed(2);
  } catch (error) {
    return error;
  }
};

module.exports = {
  verificaCotacao,
  getToday
};
