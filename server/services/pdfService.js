const fs = require('fs');
const { jsPDF } = require("jspdf");
const readline = require('readline');
const createError  = require('http-errors');

/**
 * function that takes a filepath in argument, reads the text and generates a pdf document out of it
 * @param metaData: Object, filePath: string
 * @return response string
 */
const textToPdf = async (metaData, filePath) => {
    // save pageHeight to add a new page when reaching it
    const pageHeight = 840;
    const doc = new jsPDF();

    doc
        .setFont('Courier', 'normal')
        .setFontSize(10)
        .setProperties(metaData);

    if(!fs.existsSync(filePath)) {
        throw new createError('file not found');
    }
    const fileStream = fs.createReadStream(filePath);

    const readLine = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    // set current line position
    let i = 0;
    for await (const line of readLine) {
        if(line === '---') {
            i = 0;
            doc.addPage();
            continue;
        }
        i += 7;
        if(line.trim().startsWith('<h1>')) {
            setHeader(doc, line, i);
            continue;
        }
        if(line.trim().startsWith('<footer>')) {
            setFooter(doc, line, i);
            continue;
        }
        if(i > pageHeight) {
            doc.addPage();
            i = 0;
        }
        doc.text(line, 20, i);
    }

    await doc.save('output.pdf');

    return 'PDF generated';
}

const setHeader = (doc, line, i) => {
    line = line
        .replace('<h1>', '')
        .replace('</h1>', '');

    doc
        .setFont('Courier', 'bold')
        .setFontSize(13)
        .text(line, 10, i)
        .setFont('Courier', 'normal')
        .setFontSize(10)
}

const setFooter = (doc, line, i) => {
    line = line
        .replace('<footer>', '')
        .replace('</footer>', '');

    doc
        .setFontSize(7)
        .text(line, 10, i)
        .setFontSize(10)
}

module.exports = {
    textToPdf
}
