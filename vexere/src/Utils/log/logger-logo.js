const figlet = require('figlet');
const TEXT = `Node JS !`;
const FONT = 'Star Wars';

async function encodeToFigText(text, font) {
    return new Promise((resolve, reject) => {
        figlet(text, { font: font }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function decode2String() {
    try {
        const figletText = await encodeToFigText(TEXT, FONT);
        return figletText
    } catch (error) {
        console.error('Cannot decode ! Please check again !');
        console.error(error);
    }
}




module.exports = {
    decode2String
};
