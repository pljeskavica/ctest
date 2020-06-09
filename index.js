const readline = require('readline');
const getFileNames = require('./utilities/getFileNames');
const runSolution = require('./utilities/runSolution');
const getDirName = require('./utilities/getDirName');

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

const validateParams = () => {
  const dirName = getDirName();
  if (!dirName) {
    console.log(
      chalk.red(
        'No directory was submitted.  Please indicate which folder you would like to test.'
      )
    );
    process.exit(0);
  }
};
const validateFiles = (d, s) => {
  if (!d) {
    console.log(
      chalk.red(
        'No data.json file was found in the directory specified.  Please create a data.json file to supply the input for your solution files.'
      )
    );
    process.exit(0);
  }
  if (!s.size) {
    console.log(
      chalk.red('No solution files were found in the directory specified.')
    );
    process.exit(0);
  }
};

const main = async () => {
  console.clear();
  validateParams();
  const { dataFile, solutionFiles } = getFileNames();
  validateFiles(dataFile, solutionFiles);
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
