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
    } else if (canBeSafeWithOneRemoval(levels)) {

      safeCount++;
    }
  }

  console.log(`Safe Reports (with Problem Dampener): ${safeCount}`);
}

function isSafe(levels) {
  let trend = null;

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }

    if (diff > 0) {

      if (trend === 'decreasing') return false;
      trend = 'increasing';
    } else if (diff < 0) {

      if (trend === 'increasing') return false;
      trend = 'decreasing';
    }
  }

  return true;
}


function canBeSafeWithOneRemoval(levels) {
  for (let i = 0; i < levels.length; i++) {

    const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));


    if (isSafe(modifiedLevels)) {
      return true;
    }
  }

  return false;
}

main();
