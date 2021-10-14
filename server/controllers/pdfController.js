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

/**
 * checks whether the file is valid, uploads it in /uploads folder, generates pdf and deletes the file.
 * @param req {Express.Request}
 * @param  req.body {file: file, [key: string]: string}
 * @param res {Express.Response}
 * @return {Promise<{response: string}>}
 */
const uploadGeneratePdf = (async (req, res) => {
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
            res.status(500).json({error: err})
        }

        res.status(200).json({response});
    })
})

module.exports = {
    generatePdfController,
    uploadGeneratePdf
}
