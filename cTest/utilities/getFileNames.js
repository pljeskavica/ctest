const { join } = require('path');

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
  const [dirName] = process.argv.slice(2);
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

      // {js: [{
      //   fullFilePath,
      //   fileName,
      //   language,
      //   command,
      // }],
      // rb: [{{
      //   fullFilePath,
      //   fileName,
      //   language,
      //   command,
      // };}]}

      solutionFiles.set(language, [
        ...(solutionFiles.get(language) || []),
        fileData,
      ]);
    });

  return { dataFile, solutionFiles };
};

module.exports = getFileNames;
