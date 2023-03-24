import { readFile } from 'node:fs';

import {
  MSG_SUPPORTED_FILES,
  MSG_SUPPORTED_FILE_PATH,
  MSG_INPUT_PLACEHOLDER,
  MSG_INPUT_FILE_PATH,
  MSG_CORRECT_LOCATION,
  MSG_PARSED_CUST_STATEMENT,
  MSG_GENERATED_REPORT_SUCCESS,
  MSG_ERROR_LOAD_FILE,
  MSG_NO_RECORDS,
  MSG_TRY_AGAIN,
  MSG_ERROR,
  CSV,
  XML,
} from '../constants/index.js';
import { readCLIQuestion } from '../scripts/readline/readCLIQuestion.js';
import { generateFailedReport } from './generateFailedReport.js';
import { formatXMLData } from './formatXMLData.js';
import { readCSV } from './readCSV.js';
import { readXML } from './readXML.js';

import { StatementRecords } from '../../type/main';

export async function processStatement():Promise<void> {
  // Path should be relative to the <root>/src/records folder
  const rootPath = `${process.cwd()}/src/records`;

  const enteredPath = await readCLIQuestion({
    message: `===> ${MSG_SUPPORTED_FILES} \n===> ${MSG_SUPPORTED_FILE_PATH}`,
    question: `${MSG_INPUT_PLACEHOLDER} ${rootPath}/`
  })

  const inputPath = `${rootPath}/${enteredPath}`;
  console.log(MSG_INPUT_FILE_PATH, inputPath)
  const extension = inputPath.split('.').pop();
  if (extension === CSV || extension === XML) {
    readFile(inputPath, { encoding: 'utf-8', flag: 'r' }, async (error, file) => {
      if (error) {
        console.log(`${MSG_ERROR} :`, error.message);
        console.log(MSG_CORRECT_LOCATION);
        return processStatement();
      }
      else {
        try {
          let formattedData: StatementRecords = [];
          if (extension === CSV) {
            formattedData = await readCSV(file);
          } else if (extension === XML) {
            const dataJson = readXML(file);
            formattedData = formatXMLData(dataJson.records.record);
          }
          console.log(MSG_PARSED_CUST_STATEMENT, formattedData);
          const report = generateFailedReport(formattedData);
          console.log('the final report......', report)
          console.log(MSG_GENERATED_REPORT_SUCCESS, report && report.length ? report : MSG_NO_RECORDS);
          return processStatement();
        } catch (error) {
          console.log(MSG_ERROR_LOAD_FILE, error);
          return processStatement();
        }
      }
    });
  } else {
    console.clear();
    console.log(`===> ${MSG_TRY_AGAIN}`);
    return processStatement();
  }
}
