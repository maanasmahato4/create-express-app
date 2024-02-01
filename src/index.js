import Enquirer from 'enquirer';
import Generator from './lib/generator.js';

const enquirer = new Enquirer();

enquirer
	.prompt([
		{
			type: 'confirm',
			name: 'typescript',
			message: 'Use typescript?',
		},
		{
			type: 'select',
			name: 'database',
			message: 'choose your prefered database',
			choices: ['mongodb', 'mysql'],
		},
		{
			type: 'input',
			name: 'app_name',
			message: 'Name of your application',
		},
	])
	.then((values) => {
		console.log(values);
		Generator(values);
	})
	.catch((error) => {
		console.error(error);
	});
