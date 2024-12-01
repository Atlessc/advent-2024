import fs from 'fs';
import path from 'path';

// Utility to parse input
function parseInput(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8').trim();
  const left = [];
  const right = [];

  data.split('\n').forEach(line => {
    const [l, r] = line.split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
  });

  return { left, right };
}

// Calculate total distance
function calculateTotalDistance(left, right) {
  // Sort both lists
  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  // Calculate the total distance
  let totalDistance = 0;
  for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }

  return totalDistance;
}

// Main function
function main() {
  const inputPath = path.resolve('inputs', 'day01.txt');
  const { left, right } = parseInput(inputPath);
  const totalDistance = calculateTotalDistance(left, right);

  console.log('Total Distance:', totalDistance);
}

main();
