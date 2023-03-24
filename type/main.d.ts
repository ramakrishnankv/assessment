export type readCLIQuestion = {
  message: string,
  question: string
};

export type Reference = {
  reference: string,
};

export type Text = {
  _text: string,
}

export type StatementRecordXML = {
  _attributes: Reference,
  accountNumber: Text,
  description: Text,
  startBalance: Text,
  mutation: Text,
  endBalance: Text,
};

export type StatementRecordsXML = StatementRecordXML[];

export type Records = {
  record: StatementRecordXML[]
};

export declare type XMLRecords = {
  records: Records
};

export declare type StatementRecord = {
  Reference: null | number,
  AccountNumber: string,
  Description: string,
  StartBalance: null | number,
  Mutation: null | number,
  EndBalance: null | number,
  ErrorMeesage?: string,
};

export declare type StatementRecords = StatementRecord[];

export declare type FailedReport = {
  Reference: null | number,
  Validation: string,
};

export declare type FailedReports = FailedReport[];

export declare type StatementFields = {
  [key: string]: string | number | boolean | object | null,
}