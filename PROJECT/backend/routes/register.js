import { Router } from "express";
const router = Router();
import db from "../db.js";
import ticketGenerator from "../utils/ticketGenerator.js";

router.get("/", async (req, res) => {
    const { name, email, churchName, phone, boardingStatus, role } = req.body;

    if (!name || !email || !phone || !boardingStatus || !role) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const uniqueID = `BDC-${Date.now()}`;

    try {
        // Inserts registration into the database
        const [result] = await db.query(
            "INSERT INTO registrations (name, email, church_name, phone, boarding_status, unique_id) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, churchName || null, phone, boardingStatus, role, uniqueID]
        );

        // Generates the PDF ticket
        const ticketPath = await ticketGenerator({
            name,
            email,
            churchName,
            phone,
            boardingStatus,
            role,
            uniqueID,
        });

        // Sends the ticket via email using Nodemailer
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

