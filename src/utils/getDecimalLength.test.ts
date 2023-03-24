import { getDecimalLength } from './getDecimalLength';

describe('Verify getDecimalLength module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('Should pass and return decimal length correctly of a number', () => {
    const result = getDecimalLength(100.01);
    expect(result).toEqual(2);
  });

  test('Should pass and return decimal length correctly of a string', () => {
    const result = getDecimalLength('100.01');
    expect(result).toEqual(2);
  });

  test('Should pass and return 0 number without decimal', () => {
    const result = getDecimalLength(1003);
    expect(result).toEqual(0);
  });

  test('Should pass and return decimal length for a negative number', () => {
    const result = getDecimalLength(-1003.336);
    expect(result).toEqual(3);
  });
})
