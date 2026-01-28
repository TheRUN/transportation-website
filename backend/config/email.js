const nodemailer = require('nodemailer');

/**
 * Create nodemailer transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send email
 * @param {Object} options - Email options (to, subject, html)
 */
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Email error: ${error.message}`);
    throw error;
  }
};

/**
 * Email templates
 */
const emailTemplates = {
  quoteConfirmation: (name, quoteData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc, #ff6b35); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
        .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .details { background: white; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Quote Request Received</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for your quote request. We have received your inquiry and our team will review it shortly.</p>
          
          <div class="details">
            <h3>Your Request Details:</h3>
            <p><strong>Service Type:</strong> ${quoteData.serviceType}</p>
            <p><strong>Origin:</strong> ${quoteData.origin}</p>
            <p><strong>Destination:</strong> ${quoteData.destination}</p>
            ${quoteData.cargoDetails ? `<p><strong>Cargo Details:</strong> ${quoteData.cargoDetails}</p>` : ''}
          </div>
          
          <p>We typically respond within 24 hours. If you have any urgent questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>Transportation Company Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Transportation Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  quoteNotificationAdmin: (quoteData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0066cc; color: white; padding: 20px; }
        .content { padding: 20px; background: #f9f9f9; }
        .details { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #ff6b35; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Quote Request</h2>
        </div>
        <div class="content">
          <p>A new quote request has been submitted:</p>
          <div class="details">
            <p><strong>Name:</strong> ${quoteData.name}</p>
            <p><strong>Email:</strong> ${quoteData.email}</p>
            <p><strong>Phone:</strong> ${quoteData.phone}</p>
            <p><strong>Company:</strong> ${quoteData.company || 'N/A'}</p>
            <p><strong>Service Type:</strong> ${quoteData.serviceType}</p>
            <p><strong>Origin:</strong> ${quoteData.origin}</p>
            <p><strong>Destination:</strong> ${quoteData.destination}</p>
            <p><strong>Cargo Details:</strong> ${quoteData.cargoDetails || 'N/A'}</p>
            <p><strong>Message:</strong> ${quoteData.message || 'N/A'}</p>
          </div>
          <p>Please review and respond to this request promptly.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  bookingConfirmation: (name, bookingData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc, #ff6b35); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
        .details { background: white; padding: 20px; border-left: 4px solid #0066cc; margin: 20px 0; }
        .status { display: inline-block; padding: 5px 15px; background: #4CAF50; color: white; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmation</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your booking has been confirmed. Here are your booking details:</p>
          
          <div class="details">
            <h3>Booking Information:</h3>
            <p><strong>Booking ID:</strong> ${bookingData._id || 'Pending'}</p>
            <p><strong>Vehicle Type:</strong> ${bookingData.vehicleType}</p>
            <p><strong>Pickup Location:</strong> ${bookingData.pickupLocation}</p>
            <p><strong>Dropoff Location:</strong> ${bookingData.dropoffLocation}</p>
            <p><strong>Scheduled Date:</strong> ${bookingData.scheduledDate}</p>
            <p><strong>Scheduled Time:</strong> ${bookingData.scheduledTime}</p>
            <p><strong>Passengers:</strong> ${bookingData.passengers}</p>
            <p><strong>Status:</strong> <span class="status">${bookingData.status}</span></p>
            ${bookingData.totalPrice ? `<p><strong>Total Price:</strong> $${bookingData.totalPrice}</p>` : ''}
          </div>
          
          <p>We look forward to serving you. If you need to make changes, please contact us as soon as possible.</p>
          
          <p>Best regards,<br>Transportation Company Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Transportation Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  welcomeEmail: (name) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0066cc, #ff6b35); color: white; padding: 30px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Transportation Company!</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Thank you for registering with us. We're excited to have you on board!</p>
          <p>You can now:</p>
          <ul>
            <li>Request quotes for your transportation needs</li>
            <li>Book vehicles from our fleet</li>
            <li>Track your bookings</li>
            <li>Manage your account</li>
          </ul>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>Transportation Company Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Transportation Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  bookingStatusUpdate: (name, bookingData, newStatus) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0066cc; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
        .status { display: inline-block; padding: 5px 15px; background: #ff6b35; color: white; border-radius: 3px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Status Update</h1>
        </div>
        <div class="content">
          <h2>Hello ${name}!</h2>
          <p>Your booking status has been updated.</p>
          <p><strong>New Status:</strong> <span class="status">${newStatus}</span></p>
          <p><strong>Booking ID:</strong> ${bookingData._id}</p>
          <p>If you have any questions about this update, please contact us.</p>
          <p>Best regards,<br>Transportation Company Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Transportation Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `
};

module.exports = { sendEmail, emailTemplates };
