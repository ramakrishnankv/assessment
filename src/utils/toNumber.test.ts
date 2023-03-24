import { toNumber } from "./toNumber";

describe('Verify toNumber module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('Should return NaN when input is non number', () => {
    const result = toNumber('m2');
    expect(result).toBe(NaN)
  });

  test('Should pass to return number when input is a stringifyed number', () => {
    const result = toNumber('2');
    expect(result).toBe(2)
  });

  test('Should pass to return number with negative symbol prefixed (-) when input is a number prefixed with -', () => {
    const result = toNumber('-2');
    expect(result).toBe(-2)
  });

  test('Should pass to return number when input is a number prefixed with +', () => {
    const result = toNumber('+2');
    expect(result).toBe(2)
  });

  test('Should pass to return number with same decimal as the input number', () => {
    const result = toNumber('333.369');
    expect(result).toBe(333.369)
  });
})