const { spawn } = require('child_process');
const chalk = require('chalk');

const indent = (count = 1) => {
  const arr = new Array(count);
  arr.fill('  ');
  return arr.join('');
};

const createRunner = ({ fullFilePath, command, input }) =>
  new Promise((resolve, reject) => {
    let solutionOutput = '';
    let solutionError = '';
    const solutionAttempt = spawn(command, [fullFilePath]);
    solutionAttempt.stdout.on('data', data => {
      solutionOutput += data;
    });
    solutionAttempt.stderr.on('data', err => {
      solutionError += err;
    });
    solutionAttempt.on('exit', code => {
      if (code) reject(solutionError);
      resolve(solutionOutput);
    });
    solutionAttempt.stdin.setEncoding('utf-8');
    solutionAttempt.stdin.write(input);
    solutionAttempt.stdin.end();
  });

const runSolution = async ({
  fullFilePath,
  command,
  input,
  output,
  inputIndex,
}) => {
  // process.stdout.write(`${chalk.bgYellow('RUNNING')} `);
  const run = createRunner({ fullFilePath, command, input })
    .then(result => {
      const pass = result === output;
      let status = pass ? chalk.bgGreen('PASS') : chalk.bgRed('FAIL');
      process.stdout.write(
        `${indent(2)}${status} Input Index: ${inputIndex} - Output: ${
          output && `Expected: ${output}`
        } Recieved: ${result} \n`
      );
    })
    .catch(console.warn);
};

module.exports = runSolution;
