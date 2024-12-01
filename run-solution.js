import readline from 'readline';
import { exec } from 'child_process';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';

// Helper function for creating styled headers
function displayHeader(text) {
  console.log(
    gradient.pastel.multiline(
      figlet.textSync(text, { horizontalLayout: 'default' })
    )
  );
}

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display a welcome banner
displayHeader('Advent of Code');

// Prompt for day and part
rl.question(chalk.blueBright('Enter the day (e.g., 01): '), (day) => {
  rl.question(chalk.magentaBright('Enter the part (e.g., 1): '), (part) => {
    const scriptPath = path.resolve(`solutions/day${day}-part${part}.js`);

    console.log(chalk.yellowBright(`\nRunning: ${scriptPath}\n`));

    // Execute the script
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error: ${error.message}`));
      }
      if (stderr) {
        console.error(chalk.red(`Stderr: ${stderr}`));
      }

      // Display output with a gradient effect
      console.log(
        gradient.rainbow(
          `\n======================= OUTPUT =======================\n`
        )
      );
      console.log(chalk.greenBright(stdout));
      console.log(
        gradient.rainbow(
          `\n=====================================================\n`
        )
      );
    });

    // Close the readline interface
    rl.close();
  });
});
