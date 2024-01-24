const fs = require('fs').promises;
const path = require('path');

const srcDirPath = path.resolve(__dirname, 'files');
const destDirPath = path.resolve(__dirname, 'files-copy');

async function copyFiles() {
  try {
    await fs.mkdir(destDirPath, { recursive: true });

    const srcDirents = await fs.readdir(srcDirPath, { withFileTypes: true });
    const destDirents = await fs.readdir(destDirPath, { withFileTypes: true });

    const srcFileNames = srcDirents.filter(dirent => dirent.isFile()).map(dirent => dirent.name);
    const destFileNames = destDirents.filter(dirent => dirent.isFile()).map(dirent => dirent.name);

    for (const fileName of destFileNames) {
      if (!srcFileNames.includes(fileName)) {
        await fs.unlink(path.resolve(destDirPath, fileName));
      }
    }

    for (const fileName of srcFileNames) {
      const srcFilePath = path.resolve(srcDirPath, fileName);
      const destFilePath = path.resolve(destDirPath, fileName);

      await fs.copyFile(srcFilePath, destFilePath);
    }
  } catch (error) {
    console.error(error);
  }
}

copyFiles();