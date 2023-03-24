import csvConvertor from 'csvtojson';

import { StatementRecords } from '../../type/main'

import {
  REFERENCE,
  ACCOUNT_NUMBER,
  DESCRIPTION,
  START_BALANCE,
  MUTATION,
  END_BALANCE,
} from '../constants/index.js';

export async function readCSV(file: string):Promise<StatementRecords> {
  return await csvConvertor({
    noheader: false,
    headers: [REFERENCE, ACCOUNT_NUMBER, DESCRIPTION, START_BALANCE, MUTATION, END_BALANCE],
    colParser: {
      [REFERENCE]: 'number',
      [START_BALANCE]: 'number',
      [MUTATION]: 'number',
      [END_BALANCE]: 'number',

    }
  }).fromString(file);
}