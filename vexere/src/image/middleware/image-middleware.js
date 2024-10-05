const fs = require('fs')
const path = require('path')

exports.preview = (req, res, next) => {
    const filePath = req.params.imagePath;
    const fullImagePath = path.join(filePath);
    fs.access(fullImagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('File not found');
        }
        res.sendFile(fullImagePath);
    });
};

