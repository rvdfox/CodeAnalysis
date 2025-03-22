export abstract class BaseParser {
    
    abstract isSingleLineComment(line: string): boolean;
    abstract isMultiLineCommentStart(line: string): boolean;
    abstract isMultiLineCommentEnd(line: string): boolean;
    abstract isBlank(line: string): boolean;

    countLines(lines: string[]): { blank: number, comments: number, code: number, total: number} {
        let blank = 0, comments = 0, code = 0;
        let inMultiLineComment = false;

        for(const line of lines) {
            let trimmed = line.trim();
            
            if(this.isBlank(trimmed)) {
                blank++;
            } else if (inMultiLineComment){ 
                comments++;
                if(this.isMultiLineCommentEnd(trimmed)){
                    inMultiLineComment = false;
                }
            } else if (this.isMultiLineCommentStart(trimmed)) {
                comments++;
                inMultiLineComment = true;
            } else if (this.isSingleLineComment(trimmed)) {
                comments++;
            } else {
                code++;
            }
        }

        return { blank, comments, code, total: lines.length }
    }
}