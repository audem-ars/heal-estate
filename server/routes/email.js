// server/routes/email.js (or add to your existing routes)
const express = require('express');
const router = express.Router();
const emailService = require('../services/email-service');

// POST /api/email/signup - Handle Heal Estate signups
router.post('/signup', async (req, res) => {
  try {
    const { email } = req.body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Optional: Save to database here
    // await User.create({ email, source: 'heal-estate-landing' });

    // Send welcome email to user
    const welcomeEmailSent = await emailService.sendWelcomeEmail(email);
    
    // Send notification to admin
    const adminNotificationSent = await emailService.sendNotificationToAdmin(email);

    if (welcomeEmailSent) {
      console.log(`✅ New Heal Estate signup: ${email}`);
      
      res.status(200).json({
        success: true,
        message: 'Welcome to Heal Estate! Check your email for next steps.'
      });
    } else {
      // Still return success to user, but log the email failure
      console.error('❌ Welcome email failed but signup recorded');
      
      res.status(200).json({
        success: true,
        message: 'Welcome to Heal Estate! Our team will contact you within 24 hours.'
      });
    }

  } catch (error) {
    console.error('❌ Signup error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.'
    });
  }
});

module.exports = router;

// ========================================
// ALTERNATIVE: Express app setup example
// ========================================

/*
// server/app.js (or your main server file)
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/email', require('./routes/email'));

// Serve your landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Heal Estate server running on port ${PORT}`);
});
*/