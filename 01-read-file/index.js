// Import the necessary modules
const fs = require('fs');
const path = require('path');

// Construct the absolute path to the text file
const filePath = path.join(__dirname, 'text.txt');

// Create a read stream from the text file
const readStream = fs.createReadStream(filePath);

// Direct the read stream to the standard output stream
readStream.pipe(process.stdout);