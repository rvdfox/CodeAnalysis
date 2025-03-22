import { BaseParser } from "./BaseParser";

export class PythonParser extends BaseParser {
    
    isSingleLineComment(line: string): boolean {
        return line.trim().startsWith("#");
    }

    isBlank(line: string): boolean {
        return line == "";
    }

    isMultiLineCommentStart(line: string): boolean {
        return line.startsWith("'''") || line.startsWith('"""');
    }
    
    isMultiLineCommentEnd(line: string): boolean {
        return line.endsWith("'''") || line.endsWith('"""');
    }
}