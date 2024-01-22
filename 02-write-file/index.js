const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.resolve(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Hey! Enter text or you can also type "exit" or press Ctrl+C to quit.\n', handleInput);

function handleInput(input) {
  if (input.trim().toLowerCase() === 'exit') {
    console.log('Goodbye!');
    rl.close();
  } else {
    writeStream.write(input + '\n');
    console.log('Text written to file: u can enter more text, or type "exit" to quit.');
    rl.question('', handleInput);
  }
}

process.on('SIGINT', () => {
  console.log('\nGoodbye!');
  rl.close();
});