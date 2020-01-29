const api = require('./api.bcb');
const axios = require('axios');

jest.mock('axios');
test('verificaCotacao', () => {
  const res = [
    {
      code: 'USD',
      codein: 'BRL',
      name: 'Dólar Comercial',
      high: '4.1707',
      low: '4.1707',
      varBid: '0.0004',
      pctChange: '0.01',
      bid: '4.1703',
      ask: '4.171',
      timestamp: '1579818483',
      create_date: '2020-01-23 19:28:04'
    }
  ];
  axios.get.mockResolvedValue(res);
  api.verificaCotacao().then(resp => {
    expect(resp).toEqual(res);
    console.log(axios.get.mock[0]);
  });
});

describe('getToday', () => {
  const RealDate = Date;

  function mockDate(date) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(date);
      }
    };
  }
  afterEach(() => {
    global.Date = RealDate;
  });

  test('getToday', () => {
    mockDate('2020-01-29T04:06:00z');
    const today = api.getToday();
    expect(today).toBe('29/01/2020');
  });
});
