const nodemailer = require('nodemailer');
const router = require('express').Router();
const middleware = require('../middleware/middleware'); // Import your middleware for authentication or other purposes
const Calender=require('../model/Calender')
// Define your route
router.post("/rem", middleware, async(req, res) => {
    const { id, date } = req.body;
    if (!id || !date)
        return res.status(404).json({ success: false });

    const tt=await Calender.findById(id);
    const name=tt.name;
    const reminderDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = reminderDate - currentDate;
    // Convert milliseconds to days
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    // Check if the difference is exactly 1 day
    if (differenceInDays<=1) {
        // Send email using Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'om96002@gmail.com',
                pass: 'ukpxerivmiqgvqje'
            }
        });

        const mailOptions = {
            from: 'om96002@gmail.com',
            to: 'guptamadhur2003@gmail.com',
            subject: 'Reminder',
            text: `Your reminder for task ${name} is approaching. It's scheduled for ${date}  Thank You Team Event-Management.`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error);
                res.status(500).json({ success: false, error: 'Failed to send email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ success: true, message: 'Email sent successfully' });
            }
        });
    } else {
        res.status(200).json({ success: true, message: 'No action required' });
    }
});

module.exports = router;
