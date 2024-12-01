import fs from 'fs';

export function parseInput(filePath) {
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
