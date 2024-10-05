const fs = require('fs');
const path = require('path');
exports.config = {
    driver: 'C:/'
};

exports.io = {
    createDir: (location) => {
        try {
            fs.mkdirSync(location, { recursive: true });
        } catch (error) {
            console.error(new Error('Cannot create directory!'), error);
        };
    },
    readFiles: (dirname) => {
    return new Promise((resolve, reject) => {
        console.log(dirname)
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                reject(err);
                return;
            }
            const imageFiles = filenames.filter((filename) => {
                return filename.endsWith('.jpg') || filename.endsWith('.png');
            });

            const fileReadPromises = imageFiles.map(filename => {
                return new Promise((resolve, reject) => {
                    const filePath = path.join(dirname, filename);
                    let temp = {}
                    fs.readFile(filePath, function (err, content) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        
                        temp[filename] = {
                            filename,
                            path: filePath,
                            content
                        };
                        resolve(temp[filename]);
                    });
                });
            });

            Promise.all(fileReadPromises)
                .then(files => resolve(files))
                .catch(err => reject(err));
        });
    });
    },
    writeFile: (location, data) => {
        try {
            fs.writeFileSync(location, data);
        } catch (error) {
            console.error(new Error('Cannot write file!'), error);
        }
    }
};

exports.joinPath = (...args) => path.join(...args);