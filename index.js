const readline = require('readline');
const getFileNames = require('./utilities/getFileNames');
const runSolution = require('./utilities/runSolution');
const chalk = require('chalk');

const indent = (count = 1) => {
  const arr = new Array(count);
  arr.fill('  ');
  return arr.join('');
};

const write = value => {
  process.stdout.write('\u001b[2K');
  process.stdout.write('\u001b[0G');
  process.stdout.write(value);
};

let lineCounter = 0;
const write2 = value => {
  process.stdout.write(value);
  lineCounter += 1;
  return lineCounter;
};
const main = async () => {
  console.clear();
  const { dataFile, solutionFiles } = getFileNames();
  const solutionData = require(dataFile);

  const solutionPromises = [];

  for (let keyValue of solutionFiles) {
    const [language, languageFiles] = keyValue;
    console.log(`Running ${language} solution files:`);
    for (let i = 0; i < languageFiles.length; i += 1) {
      const { fileName } = languageFiles[i];
      console.log(`${indent()} Running ${fileName}:`);
      for (let j = 0; j < solutionData.length; j += 1) {
        const { input, output } = solutionData[j];

        runSolution({ ...languageFiles[i], input, inputIndex: j, output });
      }
    }
  }
};

main();
