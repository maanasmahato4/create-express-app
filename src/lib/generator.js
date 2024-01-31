import * as fs from 'fs';
import * as path from 'path';
import * as childprocess from 'child_process';

function Generator(values) {
	let SOURCE_DIR, TARGET_DIR;
	const { app_name, typescript, database } = values;

	if (!fs.existsSync(app_name)) {
		fs.mkdirSync(app_name);
	} else {
		console.error(`${app_name} directory already exists.`);
		process.exit(1);
	}

	if (!typescript) {
		if (database === 'mongodb') {
			SOURCE_DIR = path.join(
				process.cwd(),
				'src',
				'templates',
				'javascript',
				'mongodb',
			);
		} else {
			SOURCE_DIR = path.join(
				process.cwd(),
				'src',
				'templates',
				'javascript',
				'postgresql',
			);
		}
	} else {
		if (database === 'mongodb') {
			SOURCE_DIR = path.join(
				process.cwd(),
				'src',
				'templates',
				'typescript',
				'mongodb',
			);
		} else {
			SOURCE_DIR = path.join(
				process.cwd(),
				'src',
				'templates',
				'typescript',
				'postgresql',
			);
		}
	}

	TARGET_DIR = path.join(process.cwd(), app_name);

	const files = fs.readdirSync(SOURCE_DIR);

	files.map((file) => {
		let source_path, file_path;
		source_path = path.join(SOURCE_DIR, file);
		file_path = path.join(TARGET_DIR, file);

		if (file === 'db.js' || file === 'db.ts') {
			let database_dir = path.join(TARGET_DIR, 'database');
			if (!fs.existsSync(database_dir)) {
				fs.mkdirSync(database_dir);
				file_path = path.join(database_dir, file);
				fs.copyFileSync(source_path, file_path);
			}
			file_path = path.join(database_dir, file);
			fs.copyFileSync(source_path, file_path);
		} else if (file === 'index.test.js' || file === 'index.test.ts') {
			let test_dir = path.join(TARGET_DIR, '__tests__');
			if (!fs.existsSync(test_dir)) {
				fs.mkdirSync(test_dir);
				file_path = path.join(test_dir, file);
				fs.copyFileSync(source_path, file_path);
			}
			file_path = path.join(test_dir, file);
			fs.copyFileSync(source_path, file_path);
		} else if (file === 'index.js' || file === 'index.ts') {
			let src_dir = path.join(TARGET_DIR, 'src');
			if (!fs.existsSync(src_dir)) {
				fs.mkdirSync(src_dir);
				file_path = path.join(src_dir, file);
				fs.copyFileSync(source_path, file_path);
			}
			file_path = path.join(src_dir, file);
			fs.copyFileSync(source_path, file_path);
		} else {
			fs.copyFileSync(source_path, file_path);
		}
	});

	childprocess.execSync('npm install --latest', {
		cwd: TARGET_DIR,
		stdio: 'inherit',
	});
}

export default Generator;
