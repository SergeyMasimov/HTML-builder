const fs = require('fs').promises;
const path = require('path');

const srcDirPath = path.join(__dirname, 'styles');
const destFilePath = path.join(__dirname, 'project-dist', 'bundle.css');

let cssData = [];

fs.readdir(srcDirPath, { withFileTypes: true })
  .then(dirents => {
    let promises = dirents.map(dirent => {
      if (dirent.isFile() && path.extname(dirent.name) === '.css') {

        const srcFilePath = path.join(srcDirPath, dirent.name);

        return fs.readFile(srcFilePath, 'utf8')
          .then(data => {
            cssData.push(data);
          });
      }
    });

    return Promise.all(promises);
  })
  .then(() => {
    return fs.writeFile(destFilePath, cssData.join('\n'), 'utf8');
  })
  .catch(console.error);