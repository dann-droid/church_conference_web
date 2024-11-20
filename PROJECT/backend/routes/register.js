import { Router } from "express";
const router = Router();
import { query } from "../db";
import ticketGenerator from "../utils/ticketGenerator";

router.post("/", async (req, res) => {
    const { name, email, churchName, phone, boardingStatus } = req.body;

    if (!name || !email || !phone || !boardingStatus) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const uniqueID = `BDC-${Date.now()}`;

    try {
        // Insert registration into the database
        const [result] = await query(
            "INSERT INTO registrations (name, email, church_name, phone, boarding_status, unique_id) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, churchName || null, phone, boardingStatus, uniqueID]
        );

        // Generate the PDF ticket
        const ticketPath = await ticketGenerator({
            name,
            email,
            churchName,
            phone,
            boardingStatus,
            uniqueID,
        });

        // TODO: Send the ticket via email using Nodemailer

        res.status(200).json({
            message: "Registration successful!",
            ticketPath,
            uniqueID,
        });
    } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Email is already registered!" });
        }
        res.status(500).json({ message: "Error saving registration", error: err.message });
    }
});

export default router;

