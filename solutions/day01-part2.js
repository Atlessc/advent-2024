import fs from 'fs';
import path from 'path';

// Utility to parse input
export function parseInput(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8').trim();
  const left = [];
  const right = [];
  
  data.split('\n').forEach(line => {
    const [l, r] = line.split(/\s+/).map(Number); // Split by whitespace
    left.push(l);
    right.push(r);
  });

  return { left, right };
}

// Calculate similarity score
export function calculateSimilarityScore(left, right) {
  // Create a frequency map for the right list
  const rightFrequency = new Map();
  right.forEach(num => {
    rightFrequency.set(num, (rightFrequency.get(num) || 0) + 1);
  });

  // Calculate the similarity score
  let similarityScore = 0;
  left.forEach(num => {
    const countInRight = rightFrequency.get(num) || 0;
    similarityScore += num * countInRight;
  });

  return similarityScore;
}

// Main function
function main() {
  const inputPath = path.resolve('inputs', 'day01.txt'); // Adjust path if necessary
  const { left, right } = parseInput(inputPath);
  const similarityScore = calculateSimilarityScore(left, right);

  console.log('Similarity Score:', similarityScore);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
