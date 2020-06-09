const { join } = require('path');
const getDirName = require('./getDirName');

const languageFileEndings = {
  js: {
    name: 'Javascript',
    command: 'node',
  },
  rb: {
    name: 'Ruby',
    command: 'ruby',
  },
};

const getFileNames = () => {
  const dirName = getDirName();
  const normalizedPath = join(process.cwd(), dirName);

  let dataFile = '';
  let solutionFiles = new Map();

  require('fs')
    .readdirSync(normalizedPath)
    .forEach(file => {
      const fullFilePath = join(normalizedPath, file);
      const fileEnding = file.split('.').reverse()[0];

      if (file.startsWith('data.json')) return (dataFile = fullFilePath);
      const { name: language, command } = languageFileEndings[fileEnding];

      const fileData = {
        fullFilePath,
        fileName: file,
        language,
        command,
      };

      solutionFiles.set(language, [
        ...(solutionFiles.get(language) || []),
        fileData,
      ]);
    });

  return { dataFile, solutionFiles };
};

module.exports = getFileNames;
