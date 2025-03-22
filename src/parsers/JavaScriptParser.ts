import { BaseParser } from "./BaseParser";

export class JavaScriptParser extends BaseParser {
    isSingleLineComment(line: string): boolean {
        return line.startsWith("//");
    }

    isBlank(line: string): boolean {
        return line === "";
    }

    isMultiLineCommentStart(line: string): boolean {
        return line.startsWith("/*");
    }
    
    isMultiLineCommentEnd(line: string): boolean {
        return line.endsWith("*/");
    }
}