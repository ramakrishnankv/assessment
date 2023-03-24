import { getDecimalLength } from './getDecimalLength.js';

import { StatementRecord } from '../../type/main';

export function findEndBalanceMatch(record: StatementRecord): boolean {
  const { StartBalance, Mutation, EndBalance } = record;
  if (StartBalance !== undefined && StartBalance !== null
    && Mutation !== undefined && Mutation !== null
    && EndBalance !== undefined && EndBalance !== null) {
    const decLengths: number[] = [
      getDecimalLength(StartBalance),
      getDecimalLength(Mutation),
      getDecimalLength(EndBalance)
    ];
    const decMax = Math.max(...decLengths);
    const normaliser = Math.pow(10, decMax)
    const sum = Math.round((StartBalance + Mutation) * normaliser) / normaliser;
    const isMatch = sum === EndBalance;
    return isMatch;
  }
  return false;
}
