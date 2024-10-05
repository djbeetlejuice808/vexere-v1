const fs = require('fs');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const extensionFs = require('../../Utils/ioExtension')


const FILE = {
    SIZE: 500000,
    TYPE:/\.(png|jpg)$/,

}

const imageUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: FILE.SIZE
    },
    fileFilter(req, file, cb) {
        let imageType = FILE.TYPE
        if (!file.originalname.match(imageType)) {     
            return cb(new Error('Please upload a Image !'))
        }
        cb(undefined, true)
    }
}) 

const injectSVG = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return next(new Error('No files uploaded !'));
    }

    try {
        const svgPath = extensionFs.joinPath(__dirname, 'vexere.svg');
        const svgBuffer = fs.readFileSync(svgPath);
        const outputDir = extensionFs.joinPath(extensionFs.config.driver, 'images');
        extensionFs.io.createDir(outputDir);

        const resizedSVGBuffer = await sharp(svgBuffer)
            .resize({ width: 200 })
            .toBuffer();

        const processedFiles = await Promise.all(req.files.map(async (file) => {
            const image = sharp(file.buffer);
            const { width, height } = await image.metadata();

            const logoWidth = 200;
            const logoHeight = (logoWidth * height) / width;
            const left = Math.round(width - logoWidth);
            const top = Math.round(height - logoHeight);
            const processedImage = await image
                .composite([{ input: resizedSVGBuffer, top: top, left: left }])
                .toBuffer();
            const outputPath = extensionFs.joinPath(outputDir, `${Date.now()}_${file.originalname}`);
            extensionFs.io.writeFile(outputPath, processedImage);
            return outputPath;
        }));
        
        req.processedFiles = processedFiles;
        next();
    } catch (error) {
        next(error);
    }
};


const upload = imageUpload
module.exports = {
    upload,
    injectSVG
};
