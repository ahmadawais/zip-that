const fs = require('fs');
const archiver = require('archiver');

/**
 * Zip a directory.
 *
 * @param {String} src Source directory path.
 * @param {String} dst Destination path + filename.zip.
 */
module.exports = async (src, dst) => {
	const archive = archiver.create('zip', {});
	const output = fs.createWriteStream(dst);

	archive.on('warning', function(err) {
		if (err.code === 'ENOENT') {
			console.log(err);
		} else {
			throw err;
		}
	});

	archive.on('error', function(err) {
		throw err;
	});

	await archive.pipe(output);
	await archive.directory(src, false);
	await archive.finalize();
};
