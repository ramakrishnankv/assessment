import { formatXMLData } from './formatXMLData';

describe('Verify formatXMLData module', () => {

  const dataToMatch = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.00,
    Mutation: -0.20,
    EndBalance: 99.80,
  };

  const data2ToMatch = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 100.00,
    Mutation: +0.20,
    EndBalance: 100.20,
  };

  const data0ToMatch = {
    Reference: 12345,
    AccountNumber: 'NL69ABNA0433647324',
    Description: '',
    StartBalance: 0,
    Mutation: 0,
    EndBalance: 0,
  };

  // Data as received from XML parser
  const dataSuccess = [
    {
      _attributes: { reference: '143221' },
      accountNumber: { _text: 'NL69ABNA0433647324' },
      description: { _text: 'Subscription for Erik de Vries' },
      startBalance: { _text: '44.49' },
      mutation: { _text: '+18.42' },
      endBalance: { _text: '62.91' },
    }
  ];

  const dataMissingAtt = [
    {
      accountNumber: { _text: 'NL69ABNA0433647324' },
      description: { _text: 'Subscription for Erik de Vries' },
      startBalance: { _text: '44.49' },
      mutation: { _text: '+18.42' },
      endBalance: { _text: '62.91' },
    }
  ]

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('Should pass and return required json structure form json created from xml', () => {
    const result = formatXMLData(dataSuccess);
    expect(result).toEqual([{ "Reference": 143221, "AccountNumber": "NL69ABNA0433647324", "Description": "Subscription for Erik de Vries", "EndBalance": 62.91, "Mutation": 18.42, "StartBalance": 44.49 }])
  });

  test('Should pass and return required json structure form json created from xml', () => {
    const result = formatXMLData(dataMissingAtt as any);
    expect(result).toEqual([{ "Reference": null, "AccountNumber": "NL69ABNA0433647324", "Description": "Subscription for Erik de Vries", "EndBalance": 62.91, "Mutation": 18.42, "StartBalance": 44.49 }])
  });


});
