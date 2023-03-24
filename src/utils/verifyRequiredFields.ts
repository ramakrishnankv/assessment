import { StatementFields } from '../../type/main';

export function verifyRequiredFields(object: StatementFields, requiredFields: string[]): Array<string> {
  const problematic: string[] = [];
  requiredFields.map((reqField) => {
    const isMatch = Object.keys(object).some((element) => {
      return reqField === element && object[reqField] !== null;
    });
    if (!isMatch) {
      problematic.push(reqField);
    }
  })
  return problematic;
}
