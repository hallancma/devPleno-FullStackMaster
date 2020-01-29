const getCep = cep => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cep === 11680000) {
        resolve(`foi 1`);
      }
      reject('Erro ao consultar o cep');
    }, 00);
  });
};

const getCep2 = cep => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cep === 11680000) {
        resolve(`foi 2`);
      }
      reject('Erro ao consultar o cep');
    }, 3000);
  });
};

const mostrarCep = async cep => {
  try {
    const retorno = await getCep(cep);
    //const retorno2 = await getCep2(cep);
    console.log(retorno);
    //console.log(retorno2);
  } catch (error) {
    console.log(error);
  }
};

mostrarCep(11680000);
