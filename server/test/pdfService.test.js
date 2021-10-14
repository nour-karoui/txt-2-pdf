const {textToPdf} = require('../services/pdfService');
const fs = require('fs');

describe('can read a text file and generate a pdf', () => {
    it('should create a pdf file', async () => {
        await textToPdf({Author: 'author'}, 'input.txt');
        const exists = fs.existsSync('output.pdf');
        expect(exists).toEqual(true);
    });

    it('should throw an error if file doesn\'t exist', async () => {
        try {
            await textToPdf({Author: 'author'}, 'doc.txt');
        } catch(error) {
            expect(error.toString()).toEqual("InternalServerError: file not found");
        }
    });
});
