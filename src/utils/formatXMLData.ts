import { ATTRIBUTES, END_BALANCE, MUTATION, START_BALANCE } from '../constants/index.js';
import { toNumber } from './toNumber.js';

import { StatementRecordXML, StatementRecordsXML, StatementRecord, StatementRecords, Reference, Text } from '../../type/main';

export function formatXMLData(records: StatementRecordsXML): StatementRecords {
  return records.map((record: StatementRecordXML) => {
    let data: StatementRecord = {
      Reference: null,
      AccountNumber: '',
      Description: '',
      StartBalance: null,
      Mutation: null,
      EndBalance: null
    };

    Object.keys(record).map((element) => {
      const key = `${element.charAt(0).toUpperCase()}${element.slice(1)}`;
      if (element === ATTRIBUTES) {
        const value = record[element as keyof StatementRecordXML] as Reference;

        data = {
          ...data,
          Reference: toNumber(value.reference),
        }
      } else {
        const value = record[element as keyof StatementRecordXML] as Text;
        const formattedValue =
          element.toLowerCase() === START_BALANCE.toLowerCase()
            || element.toLowerCase() === MUTATION.toLowerCase()
            || element.toLowerCase() === END_BALANCE.toLowerCase() 
            ? toNumber(value._text)
            : value._text;
        data = {
          ...data,
          [key]: formattedValue,
        }
      }
    })
    return data;
  });
}
