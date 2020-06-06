'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString
    .trim()
    .split('\n')
    .map(string => {
      return string.trim();
    });

  process.stdout.write(main(inputString));
  process.exit();
});

function readline() {
  return inputString[currentLine++];
}

const main = ([inputString]) => {
  const [n, k] = inputString.split(' ');
  let ans = n;
  for (let i = 0; i < k; i += 1) {
    const str = String(ans);
    const endingDigit = str[str.length - 1];
    if (endingDigit === '0') {
      ans = ans / 10;
    } else {
      ans -= 1;
    }
  }
  return String(ans);
};
