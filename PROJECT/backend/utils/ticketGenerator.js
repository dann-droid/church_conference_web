import PDFDocument from "pdfkit";
import { createWriteStream } from "fs";

const ticketGenerator = async ({ name, email, churchName, phone, boardingStatus, uniqueID }) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = `tickets/${uniqueID}.pdf`;

        doc.pipe(createWriteStream(filePath));

        doc.fontSize(20).text("Believers Dominion Conference 2025", { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`Name: ${name}`);
        doc.text(`Email: ${email}`);
        doc.text(`Church Name: ${churchName}`);
        doc.text(`Phone: ${phone}`);
        doc.text(`Boarding Status: ${boardingStatus}`);
        doc.text(`Unique ID: ${uniqueID}`);

        doc.end();
        doc.on("finish", () => resolve(filePath));
        doc.on("error", (err) => reject(err));
    });
};

export default ticketGenerator;
