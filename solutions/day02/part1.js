import fs from 'fs';
import path from 'path';

function main() {
  const reportData = fs
    .readFileSync(path.resolve('inputs', 'day02.txt'), 'utf-8')
    .trim()
    .split('\n');

  let safeCount = 0;

  for (const line of reportData) {
    const levels = line.split(/\s+/).map(Number);

    if (isSafe(levels)) {
      safeCount++;
    }
  }

  console.log(`Safe Reports: ${safeCount}`);
}

// Check if a report is safe
function isSafe(levels) {
  let trend = null; // null, 'increasing', or 'decreasing'

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    // Rule 2: Differences must be between 1 and 3
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    // Determine the trend
    if (diff > 0) {
      // Increasing
      if (trend === 'decreasing') return false;
      trend = 'increasing';
    } else if (diff < 0) {
      // Decreasing
      if (trend === 'increasing') return false;
      trend = 'decreasing';
    }
  }

  return true; // All rules satisfied
}

main();
