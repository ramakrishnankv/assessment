import { findDuplicatesInArray } from './findDuplicatesInArray';

describe('Verify findDuplicatesInArray module', () => {
  const dataToCompare = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.00,
    Mutation: -0.20,
    EndBalance: 99.80,
  };

  const records = [
    {
      Reference: 12345,
      AccountNumber: 'NL69ABNA0433647324',
      Description: '',
      StartBalance: 100.00,
      Mutation: -0.20,
      EndBalance: 99.80,
    },
    {
      Reference: 23456,
      AccountNumber: 'NL69ABNA0433647324',
      Description: '',
      StartBalance: 100.00,
      Mutation: -0.20,
      EndBalance: 99.80,
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  })

  test('Should pass and return false when no duplicates for specific field comparison', () => {
    const result = findDuplicatesInArray(records, 'Reference', dataToCompare, 0);
    expect(result).toBe(false)
  });

  test('Should fail and return true when duplicates for specific field comparison', () => {
    const dupedRecords = [...records, dataToCompare];
    const result = findDuplicatesInArray(dupedRecords, 'Reference', dataToCompare, 0);
    expect(result).toBe(true)
  })
});
