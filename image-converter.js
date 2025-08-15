// convert-png-to-webp.js
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "public/raw-images"); // Change to your PNG images folder
const outputDir = path.join(__dirname, "public/webP"); // Change to your desired output folder

function convertPngToWebp(filePath, outPath) {
	sharp(filePath)
		.webp({ quality: 80 })
		.toFile(outPath, (err) => {
			if (err) console.error(`Error converting ${filePath}:`, err);
			else console.log(`Converted: ${filePath} -> ${outPath}`);
		});
}

function walkDir(dir, callback) {
	fs.readdirSync(dir).forEach((f) => {
		const dirPath = path.join(dir, f);
		const isDirectory = fs.statSync(dirPath).isDirectory();
		isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
	});
}

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

walkDir(inputDir, (filePath) => {
	if (filePath.endsWith(".png")) {
		const relPath = path
			.relative(inputDir, filePath)
			.replace(/\.png$/, ".webp");
		const outPath = path.join(outputDir, relPath);
		const outDir = path.dirname(outPath);
		if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
		convertPngToWebp(filePath, outPath);
	}
});
