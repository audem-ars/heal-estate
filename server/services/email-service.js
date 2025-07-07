// server/services/email-service.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  }

  async sendWelcomeEmail(email) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to Heal Estate - Your Wellness Transformation Begins',
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f8faff 0%, #e8f4fd 100%); padding: 0; border-radius: 15px; overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #87ceeb 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 2.5rem; margin: 0; font-weight: 900; text-shadow: 0 0 20px rgba(255,255,255,0.3);">
                Heal Estate
              </h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 1.1rem; margin: 10px 0 0 0; letter-spacing: 1px;">
                Premium Wellness Transformation
              </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1e3c72; font-size: 1.8rem; margin-bottom: 20px; font-weight: 700;">
                Welcome to Your Transformation Journey! 🌟
              </h2>
              
              <p style="color: #333; font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                Thank you for joining Heal Estate! You've just taken the first step toward an extraordinary wellness transformation.
              </p>

              <div style="background: linear-gradient(135deg, rgba(30,60,114,0.1) 0%, rgba(135,206,235,0.1) 100%); padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #2a5298;">
                <h3 style="color: #1e3c72; margin: 0 0 15px 0; font-size: 1.3rem;">What Happens Next?</h3>
                <ul style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
                  <li><strong>Within 24 hours:</strong> Our wellness expert will contact you personally</li>
                  <li><strong>Personalized Assessment:</strong> We'll create your custom 14-day program</li>
                  <li><strong>Transformation Begins:</strong> Start your journey to optimal health</li>
                  <li><strong>Results Guaranteed:</strong> Pay only after you experience the transformation</li>
                </ul>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://calendly.com/your-booking-link" 
                   style="background: linear-gradient(45deg, #1e3c72 0%, #2a5298 25%, #87ceeb 50%, #2a5298 75%, #1e3c72 100%); 
                          color: white; 
                          padding: 16px 32px; 
                          text-decoration: none; 
                          border-radius: 50px; 
                          font-weight: 700; 
                          font-size: 1.1rem;
                          text-transform: uppercase;
                          letter-spacing: 1px;
                          box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                          display: inline-block;">
                  Schedule Your Consultation
                </a>
              </div>

              <p style="color: #666; font-size: 0.95rem; line-height: 1.6; margin-top: 30px;">
                Have questions? Simply reply to this email or call us at <strong>(555) 123-HEAL</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f8faff; padding: 25px 30px; text-align: center; border-top: 1px solid #e0e8f0;">
              <p style="color: #666; font-size: 0.9rem; margin: 0;">
                <strong>Heal Estate</strong> | Premium Wellness Transformation<br>
                📧 wellness@healestate.com | 📞 (555) 123-HEAL
              </p>
              <p style="color: #999; font-size: 0.8rem; margin: 15px 0 0 0;">
                You're receiving this because you signed up for our wellness program at healestate.com
              </p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Welcome email sent:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  }

  async sendNotificationToAdmin(email) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
        subject: '🚨 New Heal Estate Signup - High Priority Lead',
        html: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 2px solid #00ffff;">
            <div style="background: linear-gradient(135deg, #1e3c72 0%, #00ffff 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 2rem; margin: 0; font-weight: 900;">
                🎯 NEW PREMIUM LEAD
              </h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin: 10px 0 0 0; font-weight: 600;">
                Heal Estate Wellness Program
              </p>
            </div>

            <div style="padding: 30px;">
              <div style="background: linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(30,60,114,0.1) 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                <h2 style="color: #1e3c72; margin: 0 0 15px 0; font-size: 1.4rem;">📧 New Signup Details</h2>
                <p style="color: #333; font-size: 1.1rem; margin: 0;"><strong>Email:</strong> ${email}</p>
                <p style="color: #666; font-size: 0.95rem; margin: 5px 0 0 0;"><strong>Signup Time:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 1.2rem;">⚡ Action Required</h3>
                <p style="color: #856404; margin: 0; font-weight: 600;">
                  Contact this lead within 24 hours to maintain our premium service promise!
                </p>
              </div>

              <div style="text-align: center;">
                <a href="mailto:${email}" 
                   style="background: linear-gradient(45deg, #00ffff 0%, #1e3c72 100%); 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          font-weight: 700; 
                          display: inline-block;
                          margin-right: 10px;">
                  📧 Email Lead
                </a>
                <a href="https://your-crm-link.com" 
                   style="background: #28a745; 
                          color: white; 
                          padding: 15px 30px; 
                          text-decoration: none; 
                          border-radius: 8px; 
                          font-weight: 700; 
                          display: inline-block;">
                  📋 Add to CRM
                </a>
              </div>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Admin notification sent:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ Admin notification failed:', error);
      return false;
    }
  }

  // Your existing password reset method (keep it for other projects)
  async sendPasswordResetEmail(email, resetLink) {
    try {
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'VideoShop - Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p>You requested a password reset for your VideoShop account.</p>
            <p>Click the button below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}"
                  style="background: #d4af37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Reset My Password
              </a>
            </div>
            <p><strong>This link expires in 1 hour.</strong></p>
            <p>If you didn't request this reset, ignore this email.</p>
            <hr>
            <p style="font-size: 12px; color: #666;">VideoShop Team</p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent:', result.messageId);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  }
}

module.exports = new EmailService();