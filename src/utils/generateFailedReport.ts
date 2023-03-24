import {
  MSG_DUPLICATE_REFERENCE,
  MSG_END_BALANCE_MISMATCH,
  REQUIRED_FIELDS_IN_JSON,
  REFERENCE,
} from '../constants/index.js';
import { findDuplicatesInArray } from './findDuplicatesInArray.js';
import { findEndBalanceMatch } from './findEndBalanceMatch.js';
import { verifyRequiredFields } from './verifyRequiredFields.js';

import { FailedReports, FailedReport, StatementRecords } from '../../type/main';

export function generateFailedReport(records: StatementRecords):FailedReports {
  if (!records || !records.length) return [];
  // Do not modify original data
  const dataRecords = [...records];
  const failedReport: FailedReports = [];

  dataRecords.map((record, index) => {
    // Verify required fileds are available if not add message into the failed report
    const reqFields = verifyRequiredFields(record, REQUIRED_FIELDS_IN_JSON);
    const { Reference, StartBalance, Mutation, EndBalance } = record;
    const msg = [];
    const isReqFieldsMissing = reqFields.length > 0;
    if (isReqFieldsMissing) {
      record.ErrorMeesage = `Missing fields - [${reqFields.join(', ')}]`;
      msg.push(record.ErrorMeesage)
    }

    // Find for duplicate reference when Reference is not null
    if (Reference) {
      const isDuplicate = findDuplicatesInArray(dataRecords, REFERENCE, record, index);
      if (isDuplicate) msg.push(MSG_DUPLICATE_REFERENCE);
    }

    // Find non-matching End Balance
    if (StartBalance !== undefined && StartBalance !== null
      && Mutation !== undefined && Mutation !== null
      && EndBalance !== undefined && EndBalance !== null) {
      const isEndBalanceMatch = findEndBalanceMatch(record);
      if (!isEndBalanceMatch) msg.push(MSG_END_BALANCE_MISMATCH);
    }

    if (msg.length > 0) {
      failedReport.push({ Reference, Validation: msg.join(' | ') })
    }
  })

  return failedReport;
}
