import fs from 'fs';
import axios from 'axios';
import path from 'path';

export const downloadImage = async (url, savePath) => {
    const directory = path.dirname(savePath);

    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    const response = await axios.get(url, { responseType: 'stream' });
    return new Promise((resolve, reject) => {
        response.data
            .pipe(fs.createWriteStream(savePath))
            .on('finish', () => {
                console.log(`Image downloaded to ${savePath}`);
                resolve(savePath);
            })
            .on('error', reject);
    });
};
