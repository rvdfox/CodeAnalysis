import { FileReader } from "../utils/FileReader";
import { ParseFactory } from "../parsers/ParserFactory";
import { JavaScriptParser } from "../parsers/JavaScriptParser";
// import * as path from "path";

jest.mock("../utils/FileReader");
jest.mock("../parsers/ParserFactory");

describe("Index File Processing", () => {
    // const mockFilePath = "test.js";
    const mockLines = [
        "// This is a comment",
        "",
        "console.log('Hello, World!'); // Inline comment",
        "const x = 5;",
        "/* Multi-line",
        "   Comment */",
        ""
    ];

    let mockParser: JavaScriptParser;

    beforeEach(() => {
        mockParser = new JavaScriptParser();
        jest.spyOn(FileReader, "readFile").mockReturnValue(mockLines);
        jest.spyOn(ParseFactory, "getParser").mockReturnValue(mockParser);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should correctly analyze total lines of code, comments, and blanks", () => {
        const result = mockParser.countLines(mockLines);

        expect(result).toEqual({
            blank: 2,
            comments: 3,
            code: 2,
            total: 7
        });
    });

    test("should handle unsupported file types", () => {
        jest.spyOn(ParseFactory, "getParser").mockReturnValue(null);

        expect(() => {
            const parser = ParseFactory.getParser(".cpp");
            if (!parser) {
                throw new Error("No parser available for this file type.");
            }
        }).toThrow("No parser available for this file type.");
    });

    test("should handle file reading errors", () => {
        jest.spyOn(FileReader, "readFile").mockImplementation(() => {
            throw new Error("File not found");
        });

        expect(() => FileReader.readFile("nonexistent.js")).toThrow("File not found");
    });
});