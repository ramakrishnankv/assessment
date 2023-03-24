import { MSG_ERROR } from "./constants/index.js";
import { processStatement } from './utils/processStatement.js';

(async () => {
  try {
    await processStatement();
  } catch (e) {
    console.log(MSG_ERROR, e)
  }
})()



