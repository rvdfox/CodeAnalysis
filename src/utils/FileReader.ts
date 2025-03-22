import * as fs from 'fs';
import * as path from 'path';

export class FileReader {
    static readFile(filePath: string): string[]{
        return fs.readFileSync(filePath, 'utf-8').split('\n');
    }

    static isFileOrFolder(inputPath: string): "file" | "folder" | "invalid" {
        if(fs.existsSync(inputPath)) {
            return fs.statSync(inputPath).isFile() ? "file" : "folder";
        }
        return "invalid";
    }

    static getAllFiles(directory: string, extensions: string[]): string[] {
        let fileList: string[] = [];

        // fn to prepare file list recursively
        function readDir(dir: string) {
            const files = fs.readdirSync(dir);
            for(const file of files) {
                const fullPath = path.join(dir, file);
                if(fs.statSync(fullPath).isDirectory()) {
                    readDir(fullPath); // recursive call
                } else if (extensions.includes(path.extname(fullPath).toLowerCase())) {
                    fileList.push(fullPath);
                }
            }
        }

        readDir(directory);
        return fileList;
    }
}