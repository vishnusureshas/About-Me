import nodemailer from "nodemailer"

let transporter = null

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export function isMailConfigured() {
  return Boolean(process.env.SMTP_USER?.trim() && process.env.SMTP_APP_PASSWORD?.trim())
}

export function getMailer() {
  if (transporter) return transporter
  if (!isMailConfigured()) return null
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_APP_PASSWORD.replace(/\s/g, ""),
    },
  })
  return transporter
}

// Fire-and-forget: never throw, never block the API response
export function sendContactNotification({ name, email, subject, message }) {
  const mailer = getMailer()
  const to = (process.env.NOTIFY_TO || process.env.SMTP_USER || "").trim()
  if (!mailer || !to) {
    console.warn("Mailer: skipped — set SMTP_USER, SMTP_APP_PASSWORD, NOTIFY_TO in server/.env")
    return
  }
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject || "No subject"),
    message: escapeHtml(message).replace(/\n/g, "<br>"),
  }
  mailer
    .sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER.trim()}>`,
      to,
      replyTo: email,
      subject: `New contact: ${subject || "No subject"} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "No subject"}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px">
          <h2 style="margin:0 0 12px">New portfolio message</h2>
          <p><b>Name:</b> ${safe.name}</p>
          <p><b>Email:</b> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <p><b>Subject:</b> ${safe.subject}</p>
          <div style="margin-top:12px;padding:14px;background:#f4f6fb;border-radius:10px">${safe.message}</div>
          <p style="color:#888;font-size:12px;margin-top:14px">Hit Reply to respond directly to ${safe.name}.</p>
        </div>`,
    })
    .then((info) => console.log(`Mailer: notification sent to ${to} (${info.messageId})`))
    .catch((err) => console.error("Mailer: send failed:", err.message))
}
