const fs = require('fs');
const path = require('path');

const testDataPath = path.join(__dirname, '../testData/testData.json');

class DataManager {
  // Read the current test data from JSON file
  static readTestData() {
    const rawData = fs.readFileSync(testDataPath, 'utf-8');
    return JSON.parse(rawData);
  }

  // Write data to the JSON file
  static writeTestData(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(testDataPath, jsonData, 'utf-8');
    console.log('Test data written to file:', testDataPath);
  }

  // Update specific fields in test data (deep merge for nested objects)
  static updateTestData(updates) {
    const currentData = this.readTestData();
    const updatedData = this.deepMerge(currentData, updates);
    this.writeTestData(updatedData);
    return updatedData;
  }

  // Deep merge helper to preserve nested properties
  static deepMerge(target, source) {
    const output = { ...target };

    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          // If both are objects, merge recursively
          output[key] = this.deepMerge(target[key] || {}, source[key]);
        } else {
          // Otherwise, overwrite with source value
          output[key] = source[key];
        }
      }
    }

    return output;
  }

  // Get specific field from test data
  static getTestDataField(fieldName) {
    const data = this.readTestData();
    return data[fieldName];
  }

  // Set specific field in test data
  static setTestDataField(fieldName, value) {
    const currentData = this.readTestData();
    currentData[fieldName] = value;
    this.writeTestData(currentData);
  }
}

module.exports = DataManager;
