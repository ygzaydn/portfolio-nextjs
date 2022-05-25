import * as fs from "fs";
import * as path from "path";

export const readMarkdownFile = async (fileName) => {
    const baseDir = process.cwd();
    const data = await fs.readFileSync(
        `${baseDir}/blog/files/${fileName}.md`,
        "utf8"
    );
    return data;
};
