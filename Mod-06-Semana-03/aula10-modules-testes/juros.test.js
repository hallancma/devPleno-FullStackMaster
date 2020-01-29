const juros = require('./juros');

test('jurosSimples', () => {
  const c = 100;
  const i = 0.1;
  const t = 1;
  const jurosEsperados = 10;
  const jurosCalc = juros.jurosSimples(c, i, t);
  expect(jurosCalc).toBe(jurosEsperados);
});

test('jurosSimples', () => {
  const c = 100;
  const i = 0.1;
  const t = 0;
  const jurosEsperados = 0;
  const jurosCalc = juros.jurosSimples(c, i, t);
  expect(jurosCalc).toBe(jurosEsperados);
});

test('jurosSimples', () => {
  const c = 100;
  const i = 0.1;
  const t = 10;
  const jurosEsperados = 100;
  const jurosCalc = juros.jurosSimples(c, i, t);
  expect(jurosCalc).toBe(jurosEsperados);
});

test('montanteSimples', () => {
  const c = 100;
  const i = 0.1;
  const t = 1;
  const montanteEsperado = 110;
  const jurosSimples = jest.fn();
  jurosSimples.mockImplementation(() => 10);
  const montanteSimples = juros.pure.montanteSimples({ jurosSimples });
  const montante = montanteSimples(c, i, t);
  console.log('montante', montante);
  expect(jurosSimples.mock.calls[0]).toEqual([c, i, t]);
  expect(montante).toBe(montanteEsperado);
  //const jurosCalc = juros.jurosSimples(c, i, t);
  //expect(jurosCalc).toBe(jurosEsperados);
});

test('montanteJurosCompostos', () => {
  const c = 1000;
  const i = 0.1;
  const t = 1;
  const jurosEsperados = 1100;
  const jurosCalc = juros.montanteJurosCompostos(c, i, t);
  expect(jurosCalc).toBe(jurosEsperados);
});

test('jurosCompostos', () => {
  const c = 1000;
  const i = 0.1;
  const t = 1;
  //const jurosEsperados = 1100;
  const montanteJurosCompostos = jest.fn();
  montanteJurosCompostos.mockImplementation(() => 1100);
  const jurosCompostos = juros.pure.jurosCompostos({ montanteJurosCompostos });
  const jurosCalc = jurosCompostos(c, i, t);
  expect(montanteJurosCompostos.mock.calls[0]).toEqual([c, i, t]);
  expect(jurosCalc).toBe(100);
});
