
import utils from 'nms-core-utils';

const rootDir = `${__dirname}/../`;
const buildDir = `${rootDir}/build`;
const packagePath = `${rootDir}/package.json`;
const files = ['README.md', 'LICENSE'];

/**
 * @param {string} srcPath - the source path to file
 * @param {string} destPath - the destination path to file
 * @returns {void}
 */
function copyFile(srcPath, destPath) {
	utils.writeFile(destPath, utils.readFile(srcPath));
}

/**
 * @returns {void}
 */
function createPackageFile() {
	const packageData = JSON.parse(utils.readFile(packagePath));
	delete packageData.scripts;
	delete packageData.devDependencies;
	utils.writeFile(`${buildDir}/package.json`, JSON.stringify(packageData, null, 2));
}

if (!utils.isDir(buildDir)) {
	utils.writeDir(buildDir);
}

files.forEach((file) => {
	copyFile(`${rootDir}/${file}`, `${buildDir}/${file}`);
});
createPackageFile();
