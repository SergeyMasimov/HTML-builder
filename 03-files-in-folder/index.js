const fs = require('fs').promises;
const path = require('path');

const dirPath = path.resolve(__dirname, 'secret-folder');

async function processFiles() {
  try {
    const dirents = await fs.readdir(dirPath, { withFileTypes: true });

    for (const dirent of dirents) {
      if (dirent.isFile()) {
        const filePath = path.resolve(dirPath, dirent.name);
        const stats = await fs.stat(filePath);

        const sizeKB = stats.size / 1024;
        const ext = path.extname(dirent.name).substring(1);
        const name = path.basename(dirent.name, '.' + ext);

        console.log(`${name} - ${ext} - ${sizeKB}kb`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

processFiles();