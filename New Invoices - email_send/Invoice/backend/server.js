const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create Gmail SMTP transporter with optimized settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 5,
  rateDelta: 1000,
  rateLimit: 5,
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
});

// Verify SMTP connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ SMTP Connection Error:", error.message);
    console.log("⚠️  Please check your Gmail credentials in .env file");
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "Server is running",
    service: "Invoice Email Service",
    provider: "Gmail SMTP",
    timestamp: new Date().toISOString(),
  });
});

// Keep-alive endpoint to prevent Render from sleeping
app.get("/ping", (req, res) => {
  res.json({
    status: "pong",
    timestamp: new Date().toISOString(),
  });
});

// Send email endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    const { recipientEmail, subject, emailBody, senderName } = req.body;

    // Validation
    if (!recipientEmail || !subject || !emailBody) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: recipientEmail, subject, or emailBody",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address format",
      });
    }

    // Configure email message with HTML support
    const mailOptions = {
      from: {
        name: senderName || "Logpro Supply Chain Solutions",
        address: process.env.GMAIL_USER,
      },
      to: recipientEmail,
      subject: subject,
      text: "Please view this email in an HTML-compatible email client.",
      html: emailBody, // Now properly sends HTML content
    };

    // Send email via Gmail SMTP with timeout and retry
    console.log(`📧 Sending email to: ${recipientEmail}`);

    const sendEmailWithRetry = async (maxRetries = 3) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          // Set timeout for email sending
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("Email sending timeout")), 20000); // 20 second timeout
          });

          const emailPromise = transporter.sendMail(mailOptions);
          const info = await Promise.race([emailPromise, timeoutPromise]);

          console.log(`✅ Email sent successfully on attempt ${attempt}!`);
          console.log(`📬 Message ID: ${info.messageId}`);
          return info;
        } catch (error) {
          console.log(`❌ Attempt ${attempt} failed:`, error.message);

          if (attempt === maxRetries) {
            throw error;
          }

          // Wait before retrying (exponential backoff)
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
          console.log(`⏳ Retrying in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    };

    const info = await sendEmailWithRetry();

    console.log(`✅ Email sent successfully!`);
    console.log(`📬 Message ID: ${info.messageId}`);

    res.json({
      success: true,
      message: "Email sent successfully",
      recipient: recipientEmail,
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);

    // Handle Gmail SMTP specific errors
    if (error.code === "EAUTH") {
      return res.status(500).json({
        success: false,
        error: "Gmail authentication failed",
        details: "Please check your Gmail email and App Password in .env file",
      });
    }

    if (error.code === "ECONNECTION") {
      return res.status(500).json({
        success: false,
        error: "Cannot connect to Gmail SMTP server",
        details: "Please check your internet connection",
      });
    }

    if (error.message === "Email sending timeout") {
      return res.status(408).json({
        success: false,
        error: "Email sending timeout",
        details: "Server took too long to respond. Please try again.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service ready with Gmail SMTP`);
  console.log(
    `🔑 Gmail User: ${process.env.GMAIL_USER || "Not configured ❌"}`,
  );
  console.log(
    `🔐 App Password: ${process.env.GMAIL_APP_PASSWORD ? "****** (Set ✅)" : "Not configured ❌"}`,
  );
  console.log("");
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("⚠️  Warning: Gmail credentials not configured!");
    console.log("📝 Please update your .env file with:");
    console.log("   - GMAIL_USER=your-email@gmail.com");
    console.log("   - GMAIL_APP_PASSWORD=your-16-digit-app-password");
  }
});

// Error handling for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Rejection:", error);
});
