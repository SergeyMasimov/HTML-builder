const fs = require('fs').promises;
const path = require('path');

const srcDirPath = path.resolve(__dirname, 'files');
const destDirPath = path.resolve(__dirname, 'files-copy');

async function copyFiles() {
  try {
    await fs.mkdir(destDirPath, { recursive: true });

    const dirents = await fs.readdir(srcDirPath, { withFileTypes: true });

    for (const dirent of dirents) {
      if (dirent.isFile()) {
        const srcFilePath = path.resolve(srcDirPath, dirent.name);
        const destFilePath = path.resolve(destDirPath, dirent.name);

        await fs.copyFile(srcFilePath, destFilePath);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

copyFiles();