import fs from 'fs';
import path from 'path';

function main() {
  try {
    const inputPath = path.resolve('inputs', 'day03.txt');
    if (!fs.existsSync(inputPath)) {
      console.error(`Error: File not found at ${inputPath}`);
      return;
    }

    const corruptedMemory = fs.readFileSync(inputPath, 'utf-8').trim();

    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

    let total = 0;
    let match;

    while ((match = regex.exec(corruptedMemory)) !== null) {
      const x = parseInt(match[1], 10);
      const y = parseInt(match[2], 10);

      total += x * y;
    }

    console.log(`Total of all valid multiplications: ${total}`);
  } catch (error) {
    console.error(`Error reading or processing the file: ${error.message}`);
  }
}

main();
