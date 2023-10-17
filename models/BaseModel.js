import { mapKeys, camelCase, omit } from "lodash-es";

class DatabaseEror extends Error {}

export default class BaseModel {
  assertOneRecord(records) {
    if (records.length > 1)
      throw new DatabaseEror("Expected on record, received multiple");
  }

  /**
   *
   * @param {Object} row
   * @param {Array<String>?} ommit
   * @returns Object
   */
  formatRow(row, columnsToOmit) {
    const rowObj = mapKeys(row, (value, key) => camelCase(key));

    return omit(rowObj, columnsToOmit);
  }
}
