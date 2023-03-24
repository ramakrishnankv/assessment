import { findEndBalanceMatch } from './findEndBalanceMatch';

describe('Verify findEndBalanceMatch module', () => {
  const posMut = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.00,
    Mutation: +0.20,
    EndBalance: 100.20,
  };

  const negMut = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.00,
    Mutation: -0.20,
    EndBalance: 99.80,
  }; 

  const zeroBal = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 0,
    Mutation: 0,
    EndBalance: 0,
  };

  const noStartBal = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    Mutation: 0,
    EndBalance: 0,
  };

  const wrongBal = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.50,
    Mutation: -0.50,
    EndBalance: 101.50,
  };

  const posDecimalCheckBal = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.51280009,
    Mutation: +50.0033,
    EndBalance: 150.51610009,
  };

  const negDecimalCheckBal = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.5128,
    Mutation: -50.0128,
    EndBalance: 50.5000,
  };

  const noDecimalCheckBal = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 101,
    Mutation: -52,
    EndBalance: 49,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('Should pass and return true when EndBalance matches when StartBalance added with positive Mutation', () => {
    const result = findEndBalanceMatch(posMut);
    expect(result).toBe(true)
  });

  test('Should pass and return true when EndBalance matches when StartBalance added with negative Mutation', () => {
    const result = findEndBalanceMatch(negMut);
    expect(result).toBe(true)
  });

  test('Should pass and return true with zero balances', () => {
    const result = findEndBalanceMatch(zeroBal);
    expect(result).toBe(true)
  });

  test('Should fail and return false Start, Mutation or End balances are not available', () => {
    const result = findEndBalanceMatch(noStartBal as any);
    expect(result).toBe(false)
  });

  test('Should fail and return false when when End Balance mis-match', () => {
    const result = findEndBalanceMatch(wrongBal);
    expect(result).toBe(false)
  });

  test('Should pass and return true when more than 2 decimals in positive mutation', () => {
    const result = findEndBalanceMatch(posDecimalCheckBal);
    expect(result).toBe(true)
  });

  test('Should pass and return true when more than 2 decimals in negative mutation', () => {
    const result = findEndBalanceMatch(negDecimalCheckBal);
    expect(result).toBe(true)
  });
  test('Should pass and return true when more no decimals in balances', () => {
    const result = findEndBalanceMatch(noDecimalCheckBal);
    expect(result).toBe(true)
  });
});
