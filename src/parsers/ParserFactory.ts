import { BaseParser } from "./BaseParser";
import { JavaScriptParser } from "./JavaScriptParser";
import { PythonParser } from "./PythonParser";

export class ParseFactory {
    static getParser(extension: string): BaseParser | null {
        switch(extension) {
            case ".js":
            case ".ts":
            case ".java":
                return new JavaScriptParser();
            case ".py":
                return new PythonParser();
            default:
                console.error(`Not Implemented filetype: ${extension}`);
                return null;
        }
    }
}