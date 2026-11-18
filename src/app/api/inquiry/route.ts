import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { submitWixInquiry, isWixConfigured } from "@/lib/wix-cms";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      company,
      phone,
      email,
      mineral,
      quantity,
      visitRequested,
      message,
    } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    // Generate unique inquiry reference ID
    const refId = `AS-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    console.log(`[INQUIRY RECEIVED] Ref: ${refId} from ${name} (${company || "N/A"}), Mineral: ${mineral}, Qty: ${quantity} MT`);

    // Optional Wix CMS Synchronization
    let wixSaved = false;
    if (isWixConfigured()) {
      try {
        const wixRes = await submitWixInquiry({
          referenceId: refId,
          fullName: name,
          companyName: company || "Not Specified",
          email: email || "",
          phone,
          mineralType: String(mineral || "General Inquiry"),
          volume: `${quantity || "Custom"} MT`,
          deliveryLocation: visitRequested ? "Himatnagar Plant Visit Requested" : "Standard Logistics",
          specifications: message || "",
        });
        wixSaved = Boolean(wixRes.success);
      } catch (wixErr) {
        console.warn("[Wix CMS Inquiry Sync Error]", wixErr);
      }
    }

    // Read SMTP config from environment variables
    const host = (process.env.EMAIL_HOST || process.env.SMTP_HOST || "smtp.gmail.com").trim();
    const port = Number(process.env.EMAIL_PORT || process.env.SMTP_PORT || 587);
    const user = (process.env.EMAIL_USER || process.env.SMTP_USER || "").trim();
    // Clean password: strip all spaces and accidental surrounding quotes
    const pass = (process.env.EMAIL_PASS || process.env.SMTP_PASS || "").replace(/[\s"']/g, "").trim();
    const recipient = (process.env.INQUIRY_RECIPIENT_EMAIL || user || "info@amoghsupply.com").trim();

    // If email credentials have not been configured in .env yet
    if (!user || !pass) {
      return NextResponse.json({
        success: true,
        mockMode: true,
        wixSaved,
        refId,
        message: "Inquiry logged successfully. Note: Add EMAIL_USER and EMAIL_PASS to your .env file to enable live email delivery.",
      });
    }

    // Configure live nodemailer transport (use native 'gmail' service when Gmail is detected)
    const isGmail = host.includes("gmail") || user.toLowerCase().endsWith("@gmail.com");
    const transporter = isGmail
      ? nodemailer.createTransport({
          service: "gmail",
          auth: {
            user,
            pass,
          },
        })
      : nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: {
            user,
            pass,
          },
        });

    const emailSubject = `🔔 New Mineral Inquiry [${refId}]: ${name} (${quantity || "Bulk"} MT ${mineral || "Mineral"})`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #0d1117; color: #f0f6fc; padding: 24px; border-radius: 12px; border: 1px solid #30363d;">
        <div style="border-bottom: 2px solid #f59e0b; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #f59e0b; margin: 0; font-size: 20px;">AMOGH MINERALS &amp; SUPPLY</h2>
          <p style="color: #8b949e; margin: 4px 0 0 0; font-size: 12px;">New Direct Procurement Inquiry Desk</p>
        </div>

        <div style="background-color: #161b22; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #30363d;">
          <span style="display: inline-block; background-color: #238636; color: white; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;">REF: ${refId}</span>
          <span style="color: #8b949e; font-size: 12px; margin-left: 12px;">Received: ${timestamp} IST</span>
          ${wixSaved ? '<span style="display: inline-block; background-color: #38bdf8; color: #0f172a; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; margin-left: 8px;">Synced to Wix CMS</span>' : ''}
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; width: 35%; font-size: 13px;">Customer Name</td>
            <td style="padding: 10px 0; font-weight: bold; font-size: 14px; color: #ffffff;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">Company Name</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${company || "Not Specified"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">Phone / Mobile</td>
            <td style="padding: 10px 0; color: #58a6ff; font-weight: bold; font-size: 14px;">
              <a href="tel:${phone}" style="color: #58a6ff; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">Email Address</td>
            <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">
              ${email ? `<a href="mailto:${email}" style="color: #58a6ff; text-decoration: none;">${email}</a>` : "Not Provided"}
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">Target Mineral</td>
            <td style="padding: 10px 0; font-weight: bold; color: #f59e0b; font-size: 14px;">${mineral}</td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">Required Quantity</td>
            <td style="padding: 10px 0; font-weight: bold; color: #ffffff; font-size: 14px;">${quantity} MT (Metric Tonnes)</td>
          </tr>
          <tr style="border-bottom: 1px solid #21262d;">
            <td style="padding: 10px 0; color: #8b949e; font-size: 13px;">Plant Inspection Requested</td>
            <td style="padding: 10px 0; font-weight: bold; color: ${visitRequested ? "#3fb950" : "#8b949e"}; font-size: 13px;">
              ${visitRequested ? "YES — Customer requested Himatnagar Yard Visit" : "No"}
            </td>
          </tr>
        </table>

        ${
          message
            ? `
          <div style="background-color: #161b22; padding: 14px; border-radius: 8px; border: 1px solid #30363d; margin-bottom: 20px;">
            <p style="color: #8b949e; font-size: 11px; margin: 0 0 6px 0; text-transform: uppercase;">Customer Message / Specific Grade Requirement:</p>
            <p style="color: #c9d1d9; font-size: 13px; line-height: 1.5; margin: 0;">${message}</p>
          </div>
        `
            : ""
        }

        <div style="text-align: center; border-top: 1px solid #21262d; padding-top: 16px; color: #8b949e; font-size: 11px;">
          This inquiry was submitted via the Amogh Supply web platform.
        </div>
      </div>
    `;

    // Dispatch email to the business
    await transporter.sendMail({
      from: `"Amogh Web Desk" <${user}>`,
      to: recipient,
      replyTo: email || undefined,
      subject: emailSubject,
      html: emailHtml,
    });

    // If customer provided their email, send an instant acknowledgment
    if (email && email.includes("@")) {
      try {
        await transporter.sendMail({
          from: `"Amogh Supply" <${user}>`,
          to: email,
          subject: `Inquiry Acknowledgment [${refId}] — Amogh Supply`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 550px; margin: 0 auto; padding: 20px; color: #333;">
              <h3 style="color: #111;">Thank you for contacting Amogh Supply, ${name}.</h3>
              <p>We have successfully received your inquiry for <strong>${quantity} MT of ${mineral}</strong>.</p>
              <p>Your tracking reference is: <strong>${refId}</strong></p>
              <p>Our commercial desk in Himatnagar, Gujarat will review your technical specifications and contact you shortly at <strong>${phone}</strong>.</p>
              <br/>
              <p style="color: #666; font-size: 12px;">Amogh Supply — Direct-from-Mine Industrial Mineral Procurement &amp; Export<br/>Phone: +91 75665 12966</p>
            </div>
          `,
        });
      } catch (ackError) {
        console.warn("Could not send customer acknowledgment email:", ackError);
      }
    }

    return NextResponse.json({
      success: true,
      refId,
      wixSaved,
      message: "Inquiry transmitted successfully.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to process inquiry";
    console.error("Inquiry API Error:", errorMsg);
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
