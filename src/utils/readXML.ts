import xmlConvertor from 'xml-js';

import { XMLRecords } from '../../type/main'

export function readXML(file: string):XMLRecords {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  return xmlConvertor.xml2js(file, options) as XMLRecords;
}