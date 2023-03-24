import { StatementRecord, StatementRecords } from "../../type/main";

export function findDuplicatesInArray(array: StatementRecords, fieldKey: string, element: StatementRecord, index: number) {
  return array.some((el, int) => {
    return index !== int && element[fieldKey as keyof StatementRecord] === el[fieldKey as keyof StatementRecord]
  })
}
