import { verifyRequiredFields } from './verifyRequiredFields';

describe('Verify verifyRequiredFields module', () => {
  const record = {
    startBalance: 100,
    enableCalculation: true,
  }
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('Should pass when required fileds available', () => {
    const result = verifyRequiredFields(record, ['startBalance']);
    expect(result).toEqual([])
  });

  test('Should fail when one of the required fileds are not available', () => {
    const result = verifyRequiredFields(record, ['startBalance', 'passcode']);
    expect(result).toEqual(['passcode'])
  });

  test('Should fail when none of the required fileds are available', () => {
    const result = verifyRequiredFields(record, ['location', 'passcode']);
    expect(result).toEqual(['location', 'passcode'])
  });
})