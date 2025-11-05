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

  // Update specific fields in test data
  static updateTestData(updates) {
    const currentData = this.readTestData();
    const updatedData = { ...currentData, ...updates };
    this.writeTestData(updatedData);
    return updatedData;
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
