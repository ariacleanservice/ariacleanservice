import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

interface Review {
  id: string;
  name: string;
  role: string;
  location: string;
  stars: number;
  quote: string;
  bgImageUrl: string;
  portraitUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface SimulatedEmail {
  id: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  reviewId: string;
  sentAt: string;
  status: 'unread' | 'read';
}

interface Booking {
  id: string;
  dateTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  squareFootage: string;
  specialInstructions: string;
  bookingFrequency: string;
  amount: number;
  status: 'Confirmed' | 'Completed' | 'Rescheduled';
  createdAt: string;
}

interface Transaction {
  id: string;
  date: string;
  clientName: string;
  serviceRendered: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Refunded';
}

const REVIEWS_FILE = path.join(process.cwd(), "reviews.json");
const EMAILS_FILE = path.join(process.cwd(), "emails_log.json");
const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");
const TRANSACTIONS_FILE = path.join(process.cwd(), "transactions.json");

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "v1",
    name: "Victoria",
    role: "",
    location: "Key Biscayne, FL",
    stars: 5,
    quote: "My clients invest heavily in premium finishes—honed Calacatta marble, raw cedar ceilings, and custom silk wool rugs. Only ARIA understands how to treat these materials. No bleach odors, just meticulous preservation.",
    bgImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    portraitUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "j2",
    name: "Juliana",
    role: "",
    location: "Coral Gables, FL",
    stars: 5,
    quote: "With over 8,500 square feet of residential space to keep spotless, scheduling is typically a nightmare. The instant booking tiers and precise concierge coordination save me hours every single month.",
    bgImageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
    portraitUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    status: "approved",
    createdAt: new Date().toISOString()
  },
  {
    id: "m3",
    name: "Marcus",
    role: "",
    location: "Miami Beach, FL",
    stars: 5,
    quote: "The Eco-Organic standards are genuine. I am highly sensitive to standard chemical cleaners, but ARIA's plant-based, essential oil botanicals leave the rooms clean, healthy, and breathing completely fresh.",
    bgImageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
    portraitUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    status: "approved",
    createdAt: new Date().toISOString()
  }
];

// Seed reviews.json if not present
if (!fs.existsSync(REVIEWS_FILE)) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(DEFAULT_REVIEWS, null, 2));
}

// Seed emails_log.json if not present
if (!fs.existsSync(EMAILS_FILE)) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify([], null, 2));
}

// Seed bookings.json with empty array if not present
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// Seed transactions.json with empty array if not present
if (!fs.existsSync(TRANSACTIONS_FILE)) {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify([], null, 2));
}

function readReviews(): Review[] {
  try {
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, "utf-8"));
  } catch (err) {
    return DEFAULT_REVIEWS;
  }
}

function writeReviews(reviews: Review[]) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2));
}

function readEmails(): SimulatedEmail[] {
  try {
    return JSON.parse(fs.readFileSync(EMAILS_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function writeEmails(emails: SimulatedEmail[]) {
  fs.writeFileSync(EMAILS_FILE, JSON.stringify(emails, null, 2));
}

function readBookings(): Booking[] {
  try {
    return JSON.parse(fs.readFileSync(BOOKINGS_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function writeBookings(bookings: Booking[]) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

function readTransactions(): Transaction[] {
  try {
    return JSON.parse(fs.readFileSync(TRANSACTIONS_FILE, "utf-8"));
  } catch (err) {
    return [];
  }
}

function writeTransactions(transactions: Transaction[]) {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
}

let resendClient: Resend | null = null;
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    if (!resendClient) {
      resendClient = new Resend(apiKey);
    }
  }
  return resendClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log incoming request paths
  app.use((req, res, next) => {
    console.log(`[HTTP] ${req.method} ${req.url}`);
    next();
  });

  // --- API ROUTES ---

  // 0. Contact Form secure submission with honeypot validation & automated emails (Resend + Simulated Logs)
  app.post("/api/contact", async (req, res) => {
    const { fullName, emailAddress, phoneNumber, squareFootage, specialInstructions, website_aria_verification } = req.body;

    // Honeypot spam filtering protection logic
    if (website_aria_verification && website_aria_verification.trim().length > 0) {
      console.warn(`[SPAM BLOCKED] Honeypot triggered by bot filled value: "${website_aria_verification}"`);
      // Return standard mock successful status code and response so spambots believe they succeeded
      return res.status(200).json({
        success: true,
        message: "Thank you, your custom request has been successfully filed."
      });
    }

    if (!fullName || !emailAddress) {
      return res.status(400).json({ error: "Your name and verified email address are required fields." });
    }

    // Prepare simulated corporate transactional emails
    const emailIdPrefix = `mail_contact_${Date.now()}`;
    const sentAt = new Date().toISOString();    // 1st Email: Client confirmation auto-reply
    const clientSubject = `Thank you for reaching out to Aria Clean Service`;
    const clientText = `Dear ${fullName},

Thank you for reaching out to Aria Clean Service. Your request has been safely received, and our concierge team is currently reviewing your living space parameters. We will get back to you shortly to finalize your custom curation arrangement.

Your Inquiry Details:
- Living Space Size: ${squareFootage ? `${squareFootage} sq ft` : 'Not specified'}
- Coordinates / Phone: ${phoneNumber || 'Not specified'}
- Special Requests: "${specialInstructions || 'None provided'}"

We look forward to keeping your sanctuary immaculate.

The Aria Concierge Desk
Miami Operations Hub | contact@ariacleanservice.com`;

    const clientHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background-color: #F4F1EA; color: #2D2D2D; border-radius: 12px;">
        <div style="background-color: #FAF9F5; padding: 36px; border: 1px solid #E6E2D8; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <div style="border-bottom: 1px solid #E6E2D8; padding-bottom: 24px; margin-bottom: 24px; text-align: center;">
            <h1 style="color: #2D2D2D; font-size: 26px; font-weight: normal; margin: 0; letter-spacing: 0.04em;">Aria Clean Service</h1>
            <p style="color: #A8B5A2; font-family: sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin: 6px 0 0 0; font-weight: bold;">Eco-Organic Premium Care</p>
          </div>
          
          <p style="font-size: 15px; line-height: 1.6; color: #2D2D2D; margin-bottom: 20px;">Dear ${fullName},</p>
          
          <p style="font-size: 15px; line-height: 1.7; color: #4D4D4D; margin-bottom: 24px;">
            Thank you for reaching out to Aria Clean Service. Your request has been safely received, and our concierge team is currently reviewing your living space parameters. We will get back to you shortly to finalize your custom curation arrangement.
          </p>

          <div style="background-color: #F4F1EA; border-left: 3px solid #A8B5A2; padding: 24px; margin: 28px 0; border-radius: 4px;">
            <h3 style="font-family: sans-serif; font-size: 10px; text-transform: uppercase; color: #7A7A7A; font-weight: bold; letter-spacing: 0.15em; margin: 0 0 16px 0;">Your Inquiry Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #2D2D2D; font-family: sans-serif;">
              <tr>
                <td style="padding: 8px 0; color: #7A7A7A; width: 35%;">Living Space Size:</td>
                <td style="padding: 8px 0; font-weight: 600;">${squareFootage ? `${squareFootage} sq ft` : 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7A7A7A;">Coordinates / Phone:</td>
                <td style="padding: 8px 0; font-weight: 600;">${phoneNumber || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #7A7A7A; vertical-align: top;">Special Requests:</td>
                <td style="padding: 8px 0; font-weight: 600; line-height: 1.5; white-space: pre-wrap;">${specialInstructions || 'None provided'}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #4D4D4D; margin-top: 24px;">
            We look forward to keeping your sanctuary immaculate.
          </p>
          
          <div style="margin-top: 32px; border-top: 1px solid #E6E2D8; padding-top: 24px; text-align: center;">
            <p style="font-size: 14px; color: #2D2D2D; font-weight: bold; margin: 0;">
              The Aria Concierge Desk
            </p>
            <p style="font-family: sans-serif; font-size: 10px; color: #7A7A7A; margin: 4px 0 0 0; letter-spacing: 0.05em;">
              Miami Operations Hub &bull; contact@ariacleanservice.com
            </p>
          </div>
        </div>
      </div>
    `;

    // 2nd Email: Admin notification mail
    const adminSubject = `[Inquiry] New Contact Request from ${fullName}`;
    const adminText = `Hello Aria Administrator,

A new contact inquiry request has been successfully submitted via the web contact channel.

Contact Name: ${fullName}
Client Email: ${emailAddress}
Client Phone: ${phoneNumber || 'Not specified'}
Requested Space Parameters: ${squareFootage || 'Not specified'} sq ft
Special Instructions / Booking Notes: "${specialInstructions || 'None provided'}"

SLA Target: Reply / phone/email consult within 15 minutes.`;

    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; border: 1px solid #EBEBEB; border-radius: 16px; background-color: #ffffff; color: #333333;">
        <div style="border-bottom: 1px solid #EBEBEB; padding-bottom: 20px; margin-bottom: 24px;">
          <h2 style="color: #2D2D2D; font-size: 20px; font-weight: bold; margin: 0; font-family: serif;">[Booking Inquiry] New Contact Submission</h2>
          <span style="font-size: 10px; text-transform: uppercase; border: 1px solid #A8B5A2; color: #A8B5A2; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-top: 8px; font-weight: bold; letter-spacing: 0.05em;">Honeypot Passed &bull; Client Message</span>
        </div>

        <p style="font-size: 14px; line-height: 1.5; color: #4D4D4D;">
          Hello Aria Operations Desk, a prospect has submitted a fresh custom pricing inquiry on the website contact page.
        </p>

        <div style="background-color: #FAF9F5; border-left: 3px solid #2D2D2D; padding: 20px; margin: 24px 0; border-radius: 4px;">
          <h3 style="font-size: 11px; text-transform: uppercase; color: #7A7A7A; font-weight: bold; letter-spacing: 0.1em; margin: 0 0 12px 0;">Submission Coordinates</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #2D2D2D;">
            <tr>
              <td style="padding: 6px 0; color: #7A7A7A; width: 35%;">Client Name:</td>
              <td style="padding: 6px 0; font-weight: bold;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7A7A7A;">Client Email:</td>
              <td style="padding: 6px 0; font-weight: bold;"><a href="mailto:${emailAddress}" style="color: #A8B5A2; text-decoration: none;">${emailAddress}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7A7A7A;">Phone Number:</td>
              <td style="padding: 6px 0; font-weight: bold;">${phoneNumber || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7A7A7A;">Square Footage:</td>
              <td style="padding: 6px 0; font-weight: bold;">${squareFootage || 'Not specified'} sq ft</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #7A7A7A; vertical-align: top;">Special Instructions:</td>
              <td style="padding: 6px 0; line-height: 1.4; white-space: pre-wrap;">${specialInstructions || 'None provided'}</td>
            </tr>
          </table>
        </div>

        <p style="font-size: 13px; color: #4D4D4D; line-height: 1.5; margin-bottom: 24px;">
          Please verify details, call/email the prospect to clear any checklists, and prepare a customized quotation within our 15-minute SLA bounds.
        </p>
      </div>
    `;

    // Record both emails into the simulated emails logs so the admin can read and manipulate them!
    const clientEmailRecord: SimulatedEmail = {
      id: `${emailIdPrefix}_client`,
      to: emailAddress,
      subject: clientSubject,
      text: clientText,
      html: clientHtml,
      reviewId: "",
      sentAt,
      status: "unread"
    };

    const adminEmailRecord: SimulatedEmail = {
      id: `${emailIdPrefix}_admin`,
      to: "contact@ariacleanservice.com",
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      reviewId: "",
      sentAt,
      status: "unread"
    };

    const emails = readEmails();
    emails.push(clientEmailRecord);
    emails.push(adminEmailRecord);
    writeEmails(emails);

    console.log(`[MAIL] Simulated client confirmation email recorded to ${emailAddress}`);
    console.log(`[MAIL] Simulated admin notification email recorded to contact@ariacleanservice.com`);

    // Attempt to invoke real Resend API if credentials exist
    const resend = getResendClient();
    if (resend) {
      try {
        // Send real confirmation to client
        await resend.emails.send({
          from: 'Aria Clean Services <contact@ariacleanservice.com>',
          to: emailAddress,
          subject: clientSubject,
          html: clientHtml
        });
        console.log(`[RESEND] Real client confirmation email dispatched successfully to ${emailAddress}`);

        // Send real notification to admin
        await resend.emails.send({
          from: 'Aria Clean Services <contact@ariacleanservice.com>',
          to: 'contact@ariacleanservice.com',
          subject: adminSubject,
          html: adminHtml
        });
        console.log(`[RESEND] Real admin notification email dispatched successfully to contact@ariacleanservice.com`);
      } catch (err) {
        console.error("[RESEND ERROR] Failed to send real transactional emails:", err);
      }
    }

    res.json({
      success: true,
      message: "Thank you for reaching out, we will get back to you shortly"
    });
  });

  // 1. Get ONLY approved reviews for display
  app.get("/api/reviews", (req, res) => {
    const reviews = readReviews();
    const approved = reviews.filter(r => r.status === "approved");
    res.json(approved);
  });

  // 2. Submit a new review (enters pending state)
  app.post("/api/reviews", (req, res) => {
    const { name, quote, stars, location } = req.body;
    if (!name || !quote) {
      return res.status(400).json({ error: "Name and testimonial quote are required fields." });
    }

    const bgImages = [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1200"
    ];

    const portraits = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200"
    ];

    const firstNameOnly = name.trim().split(' ')[0];
    const newId = `rev_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

    const newReview: Review = {
      id: newId,
      name: firstNameOnly,
      role: "",
      location: location?.trim() || "Miami, FL",
      stars: Number(stars) || 5,
      quote: quote.trim(),
      bgImageUrl: bgImages[Math.floor(Math.random() * bgImages.length)],
      portraitUrl: portraits[Math.floor(Math.random() * portraits.length)],
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Save review
    const reviews = readReviews();
    reviews.push(newReview);
    writeReviews(reviews);

    // Prepare simulated notification email to admin
    const emailId = `mail_${Date.now()}`;
    const emailSubject = `[Moderation] ARIA Clean Review Action Required`;
    const emailBodyText = `Hello, a new client testimonial is pending your approval at contact@ariacleanservice.com.
Reviewer: ${firstNameOnly} (${location || "Miami, FL"})
Rating: ${'★'.repeat(newReview.stars)}${'☆'.repeat(5 - newReview.stars)}
Quote: "${newReview.quote}"

Action Required: Please visit the Aria Moderation Terminal inside your booking application to Approve or Reject this entry.`;

    const emailBodyHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #EBEBEB; border-radius: 16px;">
        <div style="display: flex; align-items: center; border-bottom: 1px solid #EBEBEB; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #2D2D2D; font-family: serif; margin: 0;">Aria Clean Services</h2>
        </div>
        <p style="color: #4D4D4D; font-size: 14px; line-height: 1.5;">Hello Aria Administrator,</p>
        <p style="color: #4D4D4D; font-size: 14px; line-height: 1.5;">
          A new client testimonial has been submitted and is currently <strong>awaiting moderation</strong>. It will not appear live until approved by you.
        </p>
        
        <div style="background-color: #FAF9F5; border-left: 4px solid #A8B5A2; padding: 18px; margin: 24px 0; border-radius: 0 8px 8px 0;">
          <div style="font-size: 11px; text-transform: uppercase; color: #7A7A7A; font-weight: bold; letter-spacing: 0.1em; margin-bottom: 6px;">Client Testimonial Details</div>
          <div style="font-size: 15px; color: #2D2D2D; font-style: italic; font-family: serif; margin-bottom: 12px;">"${newReview.quote}"</div>
          
          <div style="font-size: 13px; color: #2D2D2D; font-weight: bold;">${newReview.name} <span style="font-size: 11px; font-weight: normal; color: #7A7A7A;">(${newReview.location})</span></div>
          <div style="color: #A8B5A2; font-size: 14px; margin-top: 4px;">${'★'.repeat(newReview.stars)}${'☆'.repeat(5 - newReview.stars)}</div>
        </div>

        <p style="color: #4D4D4D; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
          To approve or reject this review, click the button below to open your administrator panel:
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <a href="#admin-moderation-portal" style="display: inline-block; background-color: #A8B5A2; color: white; padding: 12px 28px; text-decoration: none; font-size: 12px; font-weight: bold; border-radius: 8px; letter-spacing: 0.1em; text-transform: uppercase;">Open Admin Moderation Terminal</a>
        </div>

        <p style="color: #7A7A7A; font-size: 11px; border-top: 1px solid #EBEBEB; padding-top: 16px; margin-top: 24px;">
          This is an automated notification dispatched to <a href="mailto:contact@ariacleanservice.com" style="color: #A8B5A2; text-decoration: none;">contact@ariacleanservice.com</a>.
        </p>
      </div>
    `;

    const newEmail: SimulatedEmail = {
      id: emailId,
      to: "contact@ariacleanservice.com",
      subject: emailSubject,
      text: emailBodyText,
      html: emailBodyHtml,
      reviewId: newId,
      sentAt: new Date().toISOString(),
      status: "unread"
    };

    // Save simulated email log
    const emails = readEmails();
    emails.push(newEmail);
    writeEmails(emails);

    console.log(`[MAIL] Simulated notification dispatched to contact@ariacleanservice.com for review id: ${newId}`);

    res.json({ success: true, message: "Review submitted. Successfully notified contact@ariacleanservice.com for moderation verification.", newReview });
  });

  // 3. Get ALL reviews for admin interface (including pending/rejected)
  app.get("/api/admin/reviews", (req, res) => {
    res.json(readReviews());
  });

  // 4. Moderate a review (approve or reject)
  app.post("/api/admin/reviews/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== "approved" && status !== "rejected" && status !== "pending") {
      return res.status(400).json({ error: "Invalid status value. Approved, rejected, or pending only." });
    }

    const reviews = readReviews();
    const reviewIdx = reviews.findIndex(r => r.id === id);

    if (reviewIdx === -1) {
      return res.status(404).json({ error: "Review entity not found." });
    }

    reviews[reviewIdx].status = status;
    writeReviews(reviews);

    res.json({ success: true, message: `Review is now ${status}.`, updatedReview: reviews[reviewIdx] });
  });

  // 5. Get simulated email log
  app.get("/api/admin/emails", (req, res) => {
    res.json(readEmails());
  });

  // 6. Delete or archive all simulated emails
  app.post("/api/admin/emails/clear", (req, res) => {
    writeEmails([]);
    res.json({ success: true, message: "Simulated mail log cleared." });
  });

  // 7. Change simulated email read status
  app.post("/api/admin/emails/:id/read", (req, res) => {
    const { id } = req.params;
    const emails = readEmails();
    const idx = emails.findIndex(e => e.id === id);
    if (idx !== -1) {
      emails[idx].status = 'read';
      writeEmails(emails);
    }
    res.json({ success: true });
  });

  // 8. Secure Admin Authentication Safeguard
  app.post("/api/admin/auth", (req, res) => {
    const { passcode } = req.body;
    const expectedSecret = "8f4e6c3a9d2b1f0e7a8b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f";
    if (passcode === expectedSecret) {
      res.json({ success: true, message: "Security clearance granted." });
    } else {
      res.status(401).json({ error: "Access denied. Invalid administrative clearance passcode." });
    }
  });

  // 9. CLIENT CHANNEL: Post a fresh active booking from widget
  app.post("/api/bookings", (req, res) => {
    const { 
      clientName, 
      clientEmail, 
      clientPhone, 
      squareFootage, 
      specialInstructions, 
      bookingFrequency, 
      selectedDates, 
      selectedTime, 
      amount,
      serviceRendered,
      bookingRef
    } = req.body;

    if (!clientName || !clientEmail || !clientPhone) {
      return res.status(400).json({ error: "Name, email, and phone number are required to submit an booking." });
    }

    const bookingId = bookingRef || `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const txId = bookingId.replace('ARIA-BK-', 'TX-').replace('APT-', 'TX-');
    
    const formattedDates = Array.isArray(selectedDates) ? selectedDates : ["Tuesday, May 26"];
    const formattedTime = selectedTime || "Morning Slot (8:00 AM – 11:00 AM)";
    const numericAmt = Number(amount) || 0;

    const newBooking: Booking = {
      id: bookingId,
      dateTime: `${formattedDates.join(' and ')} at ${formattedTime}`,
      clientName,
      clientEmail,
      clientPhone,
      squareFootage: squareFootage ? `${squareFootage} sq ft` : "Not specified",
      specialInstructions: specialInstructions || "No special requests specified.",
      bookingFrequency: bookingFrequency || "one-time",
      amount: numericAmt,
      status: "Confirmed",
      createdAt: new Date().toISOString()
    };

    const newTx: Transaction = {
      id: txId,
      date: new Date().toISOString().split('T')[0],
      clientName,
      serviceRendered: serviceRendered || "Elite Bi-Weekly Deep Clean Package",
      amount: numericAmt,
      status: "Paid"
    };

    // Save Booking
    const bookings = readBookings();
    bookings.unshift(newBooking);
    writeBookings(bookings);

    // Save Transaction
    const transactions = readTransactions();
    transactions.unshift(newTx);
    writeTransactions(transactions);

    // Create system notification logs for client and administrator email desks
    const emailPrefix = `mail_book_${Date.now()}`;
    const clientSubject = `Booking Voucher Confirmed - ${bookingId}`;
    const clientText = `Dear ${clientName},

Thank you for selecting Aria Clean Service. Your custom luxury restoration appointment has been secured successfully.

Voucher Reference: ${bookingId}
Dimensions: ${newBooking.squareFootage}
Frequency: ${newBooking.bookingFrequency === 'four-times-week' ? '4 Times a Week' : newBooking.bookingFrequency === 'bi-weekly' ? 'Bi-Weekly' : 'One-Time Appointment'}
Schedule: ${newBooking.dateTime}
Estimated Total: $${numericAmt.toFixed(2)}
Phone Registered: ${clientPhone}
Instructions: "${newBooking.specialInstructions}"

A physical supervisor will coordinate with you 24 hours prior. Thank you for your trust.

The Aria Concierge Desk
Miami Operations Hub`;

    const clientHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 40px 32px; background-color: #FAF9F5; border: 1px solid #E6E2D8; color: #2D2D2D;">
        <h2 style="text-align: center; color: #2D2D2D; letter-spacing: 0.04em;">Aria Booking Confirmation</h2>
        <p style="text-align: center; color: #A8B5A2; font-family: sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.20em; font-weight: bold; margin-top: -10px;">Voucher ${bookingId}</p>
        <hr style="border: 0; border-top: 1px solid #E6E2D8; margin: 24px 0;" />
        <p>Dear ${clientName},</p>
        <p>Your custom luxury space restoration appointment has been verified and registered cleanly. Below are the design coordinates reserved for your residence:</p>
        <div style="background-color: #FDFCFB; padding: 20px; border: 1px solid #E6E2D8; margin: 24px 0; border-radius: 4px; font-family: sans-serif; font-size: 13px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #7A7A7A;">Fulfillment Dates:</td><td style="font-weight: bold;">${formattedDates.join(' & ')}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A7A7A;">Reserved Slot:</td><td style="font-weight: bold;">${formattedTime}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A7A7A;">Active Footprint:</td><td style="font-weight: bold;">${newBooking.squareFootage}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A7A7A;">Cycle Cadence:</td><td style="font-weight: bold; text-transform: uppercase; color: #A8B5A2;">${newBooking.bookingFrequency}</td></tr>
            <tr><td style="padding: 6px 0; color: #7A7A7A;">Invoice Total:</td><td style="font-weight: bold; color: #2D2D2D;">$${numericAmt.toFixed(2)} (Paid)</td></tr>
            <tr><td style="padding: 6px 0; color: #7A7A7A; vertical-align: top;">Instructions:</td><td style="font-style: italic;">"${newBooking.specialInstructions}"</td></tr>
          </table>
        </div>
        <p style="font-size: 12px; color: #7A7A7A; text-align: center; margin-top: 32px;">Aria Customer Support &bull; contact@ariacleanservice.com</p>
      </div>
    `;

    const adminSubject = `[Booking Alert] Fresh Reservation ${bookingId} Received`;
    const adminText = `Hello Aria Administrator,

A fresh booking reservation has been successfully booked on the client widget.

Client: ${clientName}
Email: ${clientEmail}
Phone Number: ${clientPhone}
Square Footage: ${newBooking.squareFootage}
Billing Transaction Total: $${numericAmt.toFixed(2)} (Reference ${txId})
Special Notes / Requests: "${newBooking.specialInstructions}"
Appointment Date(s): ${newBooking.dateTime}

Verify cleaning team assignment and prepare botanical kit options.`;

    const adminHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #EBEBEB; border-radius: 12px; background-color: #ffffff; color: #333333;">
        <h3 style="color: #2D2D2D; font-family: serif; margin: 0;">[Reservation Booked] Fresh Account Scheduled</h3>
        <p style="font-size: 14px; margin: 12px 0 24px 0; color: #4D4D4D;">Hello Operations Desk, a client client booked a new reservation service package online:</p>
        <div style="background-color: #FAF9F5; padding: 18px; border-left: 3px solid #A8B5A2; font-size: 13px;">
          <strong>Client Name:</strong> ${clientName}<br />
          <strong>Client Email:</strong> ${clientEmail}<br />
          <strong>Phone:</strong> ${clientPhone}<br />
          <strong>Scope size:</strong> ${newBooking.squareFootage}<br />
          <strong>Scheduling Date:</strong> ${newBooking.dateTime}<br />
          <strong>Ledger Total:</strong> $${numericAmt.toFixed(2)} (Invoice ID: ${txId})
        </div>
      </div>
    `;

    const emails = readEmails();
    emails.push({
      id: `${emailPrefix}_client`,
      to: clientEmail,
      subject: clientSubject,
      text: clientText,
      html: clientHtml,
      reviewId: "",
      sentAt: new Date().toISOString(),
      status: "unread"
    });
    emails.push({
      id: `${emailPrefix}_admin`,
      to: "contact@ariacleanservice.com",
      subject: adminSubject,
      text: adminText,
      html: adminHtml,
      reviewId: "",
      sentAt: new Date().toISOString(),
      status: "unread"
    });
    writeEmails(emails);

    console.log(`[BOOKING COMPLETE] Saved booking ${bookingId} and mapped transaction receipt ${txId}.`);

    // Invoke Resend API if active
    const resend = getResendClient();
    if (resend) {
      resend.emails.send({
        from: 'Aria Clean Services <contact@ariacleanservice.com>',
        to: clientEmail,
        subject: clientSubject,
        html: clientHtml
      }).catch(err => console.error("[RESEND ERROR]", err));
    }

    res.json({ success: true, booking: newBooking, transaction: newTx });
  });

  // 10. ADMIN: Get all active bookings
  app.get("/api/admin/bookings", (req, res) => {
    res.json(readBookings());
  });

  // 11. ADMIN: Edit booking status
  app.post("/api/admin/bookings/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const bookings = readBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      writeBookings(bookings);
      return res.json({ success: true, updated: bookings[idx] });
    }
    res.status(404).json({ error: "Booking reservation record not found." });
  });

  // 12. ADMIN: Delete booking
  app.delete("/api/admin/bookings/:id", (req, res) => {
    const { id } = req.params;
    const bookings = readBookings();
    const updated = bookings.filter(b => b.id !== id);
    writeBookings(updated);
    res.json({ success: true, message: "Booking removed from workspace." });
  });

  // 13. ADMIN: Get financial ledger invoices
  app.get("/api/admin/transactions", (req, res) => {
    res.json(readTransactions());
  });

  // 14. ADMIN: Create manually generated invoice receipt
  app.post("/api/admin/transactions", (req, res) => {
    const { clientName, serviceRendered, amount, status } = req.body;
    if (!clientName || !amount) {
      return res.status(400).json({ error: "Client name and amount are required fields." });
    }
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      clientName,
      serviceRendered: serviceRendered || "Deep Botanical Restoration Care",
      amount: Number(amount) || 0,
      status: status || "Paid"
    };

    const transactions = readTransactions();
    transactions.unshift(newTx);
    writeTransactions(transactions);

    res.json({ success: true, transaction: newTx });
  });

  // 15. ADMIN: Sync manual invoice status
  app.post("/api/admin/transactions/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const transactions = readTransactions();
    const idx = transactions.findIndex(t => t.id === id);
    if (idx !== -1) {
      transactions[idx].status = status;
      writeTransactions(transactions);
      return res.json({ success: true, updated: transactions[idx] });
    }
    res.status(404).json({ error: "Invoice transaction not found." });
  });

  // 16. ADMIN: Erase invoice
  app.delete("/api/admin/transactions/:id", (req, res) => {
    const { id } = req.params;
    const transactions = readTransactions();
    const updated = transactions.filter(t => t.id !== id);
    writeTransactions(updated);
    res.json({ success: true, message: "Transaction record deleted." });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
