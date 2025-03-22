import { FileReader } from "./utils/FileReader";
import { ParseFactory } from "./parsers/ParserFactory";
import * as path from 'path';

const supportedExtensions = [".js",".ts",".py",".java"];
// input path
const inputPath = process.argv[2];
if(!inputPath) {
    console.error("Usage ts-node src/index.ts <file-path>");
    process.exit(1);
}

// input type
const inputType = FileReader.isFileOrFolder(inputPath);
if(inputType == "invalid") {
    console.error("Invalid file or directory path");
    process.exit(1);
}

let totalBlank = 0, totalComment = 0, totalCode = 0, totalLines = 0;
let filesToProcess: string[] = [];

if (inputType === "file") {
    filesToProcess.push(inputPath);
} else if (inputType == "folder") {
    filesToProcess = FileReader.getAllFiles(inputPath, supportedExtensions);
}

for (const filePath of filesToProcess) {
    // get file extension
    const fileExtension = path.extname(filePath).toLowerCase();
    const parser = ParseFactory.getParser(fileExtension);

    if(!parser) {
        console.warn(`Skipping unsupported file: ${filePath}`);
        continue;
    }

    const lines = FileReader.readFile(filePath);
    const result = parser.countLines(lines);
    
    console.log(`Processing file: ${filePath}`);
    console.log(`Result: Blank: ${result.blank}, Comments: ${result.comments}, Code: ${result.code}, Total lines: ${result.total}`);

    totalBlank += result.blank;
    totalCode += result.code;
    totalComment += result.comments;
    totalLines += result.total;
}

console.log(`\x1b[36mBlank:\x1b[36m ${totalBlank}`);
console.log(`\x1b[36mComments:\x1b[36m ${totalComment}`);
console.log(`\x1b[36mCode:\x1b[36m ${totalCode}`);
console.log(`\x1b[36mTotal:\x1b[36m ${totalLines}`);
