# Invoice Email Service - Setup Guide

## 📋 Overview

This project includes a backend email service that automatically sends invoice emails using **Gmail SMTP**. The frontend communicates with the backend API to send professional invoice emails.

---

## 🚀 Quick Start Guide

### **Step 1: Gmail App Password Setup** (10 minutes)

#### **1. Enable 2-Factor Authentication on Gmail**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Scroll to "How you sign in to Google"
3. Click on **"2-Step Verification"**
4. Click **"Get Started"**
5. Follow the prompts to enable 2FA (use phone number or authenticator app)

#### **2. Generate App Password**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Scroll to "How you sign in to Google"
3. Click on **"2-Step Verification"**
4. Scroll down and click **"App passwords"**
5. Select:
   - **App:** Mail
   - **Device:** Other (Custom name)
   - Name it: `Invoice Email Service`
6. Click **"Generate"**
7. **⚠️ IMPORTANT:** Copy the 16-character password immediately (shown only once!)
   - It will look like: `abcd efgh ijkl mnop`
   - Remove spaces when using: `abcdefghijklmnop`

---

### **Step 2: Backend Installation** (2 minutes)

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example file
   copy .env.example .env
   ```

4. **Edit `.env` file** (use Notepad or any text editor)
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   PORT=3000
   ```
   
   Replace:
   - `your-email@gmail.com` → Your actual Gmail address
   - `abcdefghijklmnop` → Your 16-digit App Password (no spaces)

---

### **Step 3: Start the Backend Server**

```bash
npm start
```

You should see:
```
🚀 Server running on port 3000
📧 Email service ready with Gmail SMTP
✅ SMTP Server is ready to send emails
🔑 Gmail User: your-email@gmail.com
🔐 App Password: ****** (Set ✅)
```

✅ **Backend is now running!** Keep this terminal window open.

---

### **Step 4: Use the Email Feature**

1. **Open the Invoice Generator**
   - Open `index.html` in your browser
   - Fill in the invoice details

2. **Send Email**
   - Scroll to the "Email Invoice" section
   - Click **"📧 Send Invoice via Email"**
   - Wait for the loading indicator
   - Success message will appear when email is sent!

3. **Check the inbox**
   - Email will be sent to `mohit.logpro@gmail.com`
   - Check spam folder if not in inbox

---

## 📁 Project Structure

```
GST Invoice/
├── backend/
│   ├── server.js          # Express server with Gmail SMTP
│   ├── package.json       # Dependencies (Nodemailer)
│   ├── .env.example       # Environment template
│   ├── .env               # Your actual config (DO NOT COMMIT!)
│   └── .gitignore         # Git ignore rules
├── index.html             # Frontend invoice form
├── script.js              # Updated with API integration
└── styles.css             # Styling
```

---

## 🔧 Troubleshooting

### **Email not sending?**

1. **Backend not running?**
   - Check if terminal shows server running message
   - Restart: `npm start` in backend folder

2. **Authentication Error (EAUTH)?**
   - Check `.env` file has correct Gmail address
   - Verify App Password is correct (16 digits, no spaces)
   - Make sure 2FA is enabled on your Gmail account
   - Try generating a new App Password

3. **Connection Error (ECONNECTION)?**
   - Check your internet connection
   - Gmail SMTP might be blocked by firewall
   - Try disabling VPN if using one

4. **2-Step Verification not showing App Passwords?**
   - Make sure 2FA is fully enabled and verified
   - Wait a few minutes after enabling 2FA
   - Try accessing from desktop (not mobile)

5. **Check browser console**
   - Press `F12` in browser
   - Look for error messages in Console tab

6. **Check backend logs**
   - Look at the terminal running `npm start`
   - Error messages will appear there

### **"Cannot connect to email server" error?**

Make sure:
- Backend server is running (`npm start`)
- Server is accessible at `http://localhost:3000`
- No firewall blocking port 3000

---

## 📊 Gmail SMTP Limits

- **500 emails per day** (for regular Gmail accounts)
- **2,000 emails per day** (for Google Workspace accounts)
- Perfect for small to medium businesses

---

## 🔐 Security Notes

- ⚠️ **NEVER** commit `.env` file to Git
- ⚠️ **NEVER** share your App Password
- ✅ `.gitignore` is configured to protect `.env`
- ✅ Use environment variables for sensitive data
- ✅ App Password only works for this app (can be revoked anytime)

---

## 🎯 Production Deployment

For production use, deploy backend to:
- **Heroku** (Free tier available)
- **Railway** (Easy deployment)
- **DigitalOcean** (Droplet)
- **AWS EC2** (More control)

Update `API_URL` in `script.js` to your production URL:
```javascript
const API_URL = 'https://your-backend-url.com/api/send-email';
```

---

## 📞 Common Issues & Solutions

### **Issue: Can't find App Passwords option**
**Solution:** 
- Ensure 2-Step Verification is enabled first
- Log out and log back into Google Account
- Access from desktop browser (not mobile)

### **Issue: App Password not working**
**Solution:**
- Remove all spaces from the password
- Make sure you're using the Gmail account that generated the password
- Try generating a new App Password

### **Issue: Emails going to spam**
**Solution:**
- Ask recipient to mark as "Not Spam"
- Add your email to recipient's contacts
- For production, consider using custom domain with SPF/DKIM records

### **Issue: Server won't start**
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm start
```

---

## ✅ Setup Checklist

- [ ] Gmail account ready
- [ ] 2-Factor Authentication enabled
- [ ] App Password generated and copied
- [ ] `.env` file created with credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Backend server running (`npm start`)
- [ ] Test email sent successfully
- [ ] Email received in inbox

---

## 🆚 Why Gmail SMTP?

✅ **No signup required** - Use existing Gmail account  
✅ **Free forever** - 500 emails/day included  
✅ **Reliable** - Google's infrastructure  
✅ **Easy setup** - Just need App Password  
✅ **Good deliverability** - Trusted by recipients  

---

**Happy emailing! 📧**
