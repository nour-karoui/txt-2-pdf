const {textToPdf} = require('../services/pdfService')
const multer = require('multer');
const { upload } = require('../utils/multer');
const fs = require('fs');
const { validationResult } = require('express-validator');

/**
 *
 * @param req body {metadata: any}
 * @param res
 * @return {Promise<{response: string}>}
 */
const generatePdfController = async (req, res) => {
    let response;
    try {
        response = await textToPdf(req.body, 'input.txt');
    }catch(error) {
        return res.status(404).json({error})
    }
    res.status(200).json({response});
}

const uploadGeneratePdf = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // check whether the file is .txt, return 400 status else
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({error: err.message})
        } else if (err) {
            return res.status(400).json({error: err.message})
        }

        const filepath = 'uploads/' + req.file.filename;
        let response;

        // keep metadata only in req.body
        delete req.body.file;

        try {
            response = await textToPdf(req.body, filepath);
        } catch (error) {
            return res.status(404).json({error});
        }

        // delete the text file after generating the pdf
        try {
            fs.unlinkSync(filepath)
        } catch(err) {
            res.status(500).json({errors: err})
        }
        res.status(200).json({response});
    })
}

module.exports = {
    generatePdfController,
    uploadGeneratePdf
}
