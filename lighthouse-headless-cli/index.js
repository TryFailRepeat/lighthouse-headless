#!/usr/bin/env node

const { exec } = require('child_process');
const ora = require('ora');
const ngrok = require('ngrok');
const args = process.argv.slice(2);
const spinner = ora({color: 'cyan'});

// print native help
if (args.includes('--help')) {
	return exec('lighthouse --help', (error, stdout) => {
		if (error) throw new Error(error);

		const output = (error)? error : stdout.replace(/lighthouse/gm, 'lighouse-local');

		process.stdout.write(output);
		process.exit();
	});
}

// get command line arguments
const options = ((arguments) => {
	const args = [...arguments];

	if(!args.includes('--ouput')) {
		args.push('--output');
		args.push('html');
	}

	if(!args.includes('--output-path')) {
		args.push('--output-path');
		args.push('./reports/report.html');
	}

	return {
		url: new URL(args.shift()) || false,
		args: args
	}
})(args);

const arg_string = ` ${options.args.join(' ')} --chrome-flags="--headless --no-sandbox"`;

// start spinner
spinner.start();
spinner.text = `---> analyzing ${options.url.href}`;

return exec(`lighthouse ${options.url.href} ${arg_string}`, (error, stdout, stderr) => {
	spinner.stop();

	// error out
	if (error) {
		throw new Error(error);
		process.exit(1);
	}

	process.stdout.write(stdout);
	process.stdout.write(stderr);
	process.exit();
});