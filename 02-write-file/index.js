const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.resolve(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let isExiting = false;

rl.question('Hey! Enter text or you can also type "exit" or press Ctrl+C to quit.\n', handleInput);

function handleInput(input) {
  if (input.trim().toLowerCase() === 'exit') {
    isExiting = true;
    console.log('Goodbye!');
    rl.close();
  } else {
    writeStream.write(input + '\n');
    console.log('Text written to file: u can enter more text, or type "exit" to quit.');
    rl.question('', handleInput);
  }
}

rl.on('close', () => {
  if (!isExiting) {
    console.log('\nGoodbye!');
  }
  process.exit();
});