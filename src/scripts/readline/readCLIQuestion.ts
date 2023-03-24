import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { readCLIQuestion } from '../../../type/main';

export async function readCLIQuestion({ message, question }: readCLIQuestion) {
  const rl = readline.createInterface({ input, output });
  console.log(message);
  const inputPath = await rl.question(question);
  rl.close();
  return inputPath
}