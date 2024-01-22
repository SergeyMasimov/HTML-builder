const fs = require('fs').promises;
const path = require('path');

const componentsDirPath = path.join(__dirname, 'components');
const stylesDirPath = path.join(__dirname, 'styles');
const assetsDirPath = path.join(__dirname, 'assets');
const templateFilePath = path.join(__dirname, 'template.html');
const destDirPath = path.join(__dirname, 'project-dist');
const destHtmlFilePath = path.join(destDirPath, 'index.html');
const destCssFilePath = path.join(destDirPath, 'style.css');
const destAssetsDirPath = path.join(destDirPath, 'assets');

fs.mkdir(destDirPath, { recursive: true })
  .catch(console.error);

fs.readFile(templateFilePath, 'utf8')
  .then(template => {
    const tagNames = template.match(/{{\s*\w+\s*}}/g)
      .map(tag => tag.replace(/[{}]/g, '').trim());

    let promises = tagNames.map(tagName => {
      const componentFilePath = path.join(componentsDirPath, tagName + '.html');
      return fs.readFile(componentFilePath, 'utf8')
        .then(component => {
          template = template.replace(new RegExp(`{{\\s*${tagName}\\s*}}`, 'g'), component);
        });
    });

    return Promise.all(promises)
      .then(() => template);
  })
  .then(html => {
    return fs.writeFile(destHtmlFilePath, html, 'utf8');
  })
  .catch(console.error);

fs.readdir(stylesDirPath, { withFileTypes: true })
  .then(dirents => {
    let cssData = [];
    let promises = dirents.map(dirent => {
      if (dirent.isFile() && path.extname(dirent.name) === '.css') {
        const cssFilePath = path.join(stylesDirPath, dirent.name);
        return fs.readFile(cssFilePath, 'utf8')
          .then(css => {
            cssData.push(css);
          });
      }
    });
    return Promise.all(promises)
      .then(() => cssData.join('\n'));
  })
  .then(css => {
    return fs.writeFile(destCssFilePath, css, 'utf8');
  })
  .catch(console.error);

async function copyDir(srcPath, destPath) {
  const dirents = await fs.readdir(srcPath, { withFileTypes: true });

  await fs.mkdir(destPath, { recursive: true });

  for (const dirent of dirents) {
    const src = path.join(srcPath, dirent.name);
    const dest = path.join(destPath, dirent.name);

    if (dirent.isDirectory()) {
      await copyDir(src, dest);
    } else if (dirent.isFile()) {
      await fs.copyFile(src, dest);
    }
  }
}

copyDir(assetsDirPath, destAssetsDirPath)
  .catch(console.error);