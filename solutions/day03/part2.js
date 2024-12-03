import fs from 'fs';
import path from 'path';

function main() {
  const inputPath = path.resolve('inputs', 'day03.txt');
  const corruptedMemory = fs.readFileSync(inputPath, 'utf-8').trim();

  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/;
  const doRegex = /do\(\)/;
  const dontRegex = /don't\(\)/;

  let total = 0;
  let enabled = true;
  const instructions = corruptedMemory.match(/do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/g);

  if (!instructions) {
    console.log('No valid instructions found.');
    return;
  }

  console.log('Instructions found:', instructions);

  for (const instruction of instructions) {
    if (doRegex.test(instruction)) {

      enabled = true;
      console.log('do(): Multiplications enabled.');
    } else if (dontRegex.test(instruction)) {

      enabled = false;
      console.log("don't(): Multiplications disabled.");
    } else if (mulRegex.test(instruction)) {

      const match = instruction.match(mulRegex);
      if (enabled && match) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        const product = x * y;
        console.log(`Processing mul(${x},${y}): ${product}`);
        total += product;
      } else {
        console.log(`Skipping mul instruction: ${instruction}`);
      }
    }
  }

  console.log(`Total of all valid enabled multiplications: ${total}`);
}

main();
