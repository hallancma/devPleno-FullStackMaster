const convert = require('./convert');

test('convert 4 to 4', () => {
  expect(convert.convert(4, 4)).toBe(16);
});

test('convert 0 to 4', () => {
  expect(convert.convert(0, 4)).toBe(0);
});

test('toMoney converts float', () => {
  expect(convert.toManey(2)).toBe('2.00');
});

test('toMoney converts string', () => {
  expect(convert.toManey(2)).toBe('2.00');
});

test('isNumber === false', () => {
  expect(convert.isNumber('sdrtr23')).toBe(false);
});

test('isNumber === true', () => {
  expect(convert.isNumber('23')).toBe(true);
});
