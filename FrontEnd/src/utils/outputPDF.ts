import outputHTML from "./outputHTML";
// import { PDFDocument, StandardFonts, copyStringIntoBuffer, rgb } from 'pdf-lib';
import puppeteer from 'puppeteer';

const fontPath = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'

export default async function outputPDF(data: {[key: string]: any}, templateString: string) {
    let htmlContent = await outputHTML(data, templateString); // get MD format
    // htmlContent = htmlContent.replace(/[^a-zA-Z\s\d.,!?@#$%^&*()_+=[\]{};:'"\\|<>\/?-]/g, '')
    // const pdfDoc = await PDFDocument.create();
    // const page = pdfDoc.addPage();
    // const { height } = page.getSize();
    // const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    
    // console.log(htmlContent)
    // page.drawText(htmlContent, {
    //   x: 50,
    //   y: height - 50,
    //   font,
    //   size: 12,
    //   color: rgb(0, 0, 0),
  
    // const pdfBytes = await pdfDoc.save();

    // return pdfBytes;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    if(fontPath){
      await page.addStyleTag({
        content: `@font-face {
          font-family: 'CustomFont';
          src: url('${fontPath}');
        }`,
      });
      await page.setContent(`<div style="font-family: 'CustomFont';">${htmlContent}</div>`);
    } else {
      await page.setContent(htmlContent);
    }

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    return pdfBuffer;
}