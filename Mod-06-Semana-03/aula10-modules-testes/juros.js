/** 
 * Exercício 1: juros simples

Crie um módulo juros.js, e exporte dele uma função jurosSimples que recebe C (capital), i (juros em decimal. ex: 3,5% = 0.035) e t (tempo). E retorne o juros simples do período (C * i * t ).
*/

const jurosSimples = (c, i, t) => c * i * t;

/** 
 * Exercício 2: montante com juros simples

Crie uma nova função que dado as mesmas variáveis do exercício anterior, retorne o montante total C + juros simples.
*/

const montanteSimples = ({ jurosSimples }) => (c, i, t) =>
  c + jurosSimples(c, i, t);

/**  
 * Exercício 3: montante com juros compostos

Crie uma função montanteJurosCompostos que recebe C (capital), i (juros em decimal) e t (tempo) e retorno o montante para o período, dado pela fórmula: M = C * (1 +  i) ^ n​.
 * */

const montanteJurosCompostos = (c, i, t) => c * Math.pow(1 + i, t);

/**  
 * Exercício 4: juros compostos

O exercício anterior já retorna o montante (capital + juros). Crie uma função em juros.js que retorne somente os juros.

(ps: para realizar testes unitários de funções que dependam de outras funções - é importante assistir a aula - Injeção de dependências)
 * 
*/

const jurosCompostos = ({ montanteJurosCompostos }) => (c, i, t) =>
  montanteJurosCompostos(c, i, t) - c;

module.exports = {
  jurosSimples,
  montanteSimples: montanteSimples({ jurosSimples }),
  montanteJurosCompostos,
  jurosCompostos: jurosCompostos({ montanteJurosCompostos }),
  pure: {
    montanteSimples,
    jurosCompostos
  }
};
