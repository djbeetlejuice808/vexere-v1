const licenseQuery= require('./license-queries')
const imageService = require('../../image/image-service')
const extensionFs = require('../../Utils/ioExtension')
exports.createLicense = async (name, purpose, imageId) => {
    try {
        const license = {
            name: name,
            purpose: purpose,
            imageId: imageId
        }
        return await licenseQuery.createLicense(license)
    }catch(error){
        console.error(error)
        throw "Service: Cannot create License."
    }
}
// Es6 version
exports.createLicenses = async (licenses) => {
    try {
        const createLicensePromises = licenses.map(async (license) => {
            const newLicense = {
                name: license.name,
                purpose: license.purpose,
                image_preview: license.image_preview,
                imageId: license.imageId
            };
            return await licenseQuery.createLicense(newLicense);
        });
        const createdLicenses = await Promise.all(createLicensePromises);
        return createdLicenses;
    } catch (error) {
        console.error(error);
        throw "Service: Cannot create Licenses.";
        return error
    }
};

exports.getAll = async () => {
    try {
        const licenses = await licenseQuery.getAll()
        
        return licenses
    }catch(error){
        console.error(error);
        throw "Service: Cannot create Licenses.";
        return error
    }
}

const path = require('path');
const fs = require('fs').promises;

exports.init = async (licenses) => {
    try {
        const directoryPath = path.join(__dirname, 'license_preview');
        console.log(directoryPath)
        const files = await fs.readdir(directoryPath);

        const images = await Promise.all(files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);
            if (stats.isFile()) {
                return {
                    filename: file,
                    path: filePath
                };
            }
        }));

        const validImages = images.filter(image => image !== undefined);
        const savedImages = await imageService.createImages(validImages);

        await Promise.all(savedImages.map(async (image, index) => {
            const license = licenses[index % licenses.length]; 
            const newLicense = {
                name: license.name,
                purpose: license.purpose,
                image_preview: image._id,
            };

            const existingLicense = await licenseQuery.getOne({
                name: license.name,
                purpose: license.purpose,
                image_preview: image._id
            });

            if (!existingLicense) {
                await licenseQuery.createLicense(newLicense);
                console.log(`Created new license: ${newLicense.name}`);
            } else {
                console.log(`License already exists: ${newLicense.name}`);
            }
        }));

        const ls = await licenseQuery.getAll();
        return ls;
    } catch (error) {
        console.error('Error initializing licenses:', error);
        throw new Error('Service: Cannot create Licenses.');
    }
};
