import * as fs from 'fs';
import * as path from 'path';

export const loadTestJson = (currentDir: string, filename: string) => {
    const filePath = path.join(currentDir, 'payload', filename);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};  