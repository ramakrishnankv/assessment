import { readCLIQuestion } from './readCLIQuestion';

jest.mock('node:readline/promises', () => {
  const readline = jest.requireActual('node:readline/promises');
  const fnQuestion = jest.fn((question) => question);
  const fnClose = jest.fn(() => {});
  readline.createInterface = () => {
    return {
      question: fnQuestion,
      close: fnClose,
    }
  }
  return readline;
})

describe('Verify readCLIQuestion module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  })
  
  test('Should pass with right messages', async () => {
    const path = await readCLIQuestion({ message: 'message', question: '/rabobank/records/records.csv'});
    expect(path).toBe('/rabobank/records/records.csv');
  })
})