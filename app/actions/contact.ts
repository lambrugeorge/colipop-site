"use server";

import { sendEmail } from "@/lib/email";

export type ContactResult = { success: boolean; error?: string };

const NOTIFICATION_EMAILS = [
  "lambru_george@yahoo.com",
  "sc.colipop.sr@gmail.com",
];

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const agreePrivacy = formData.get("privacy") === "on";
  const captcha = formData.get("captcha") === "on";

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "missing_fields" };
  }
  if (!agreePrivacy || !captcha) {
    return { success: false, error: "privacy_required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: "invalid_email" };
  }

  // Define notification properties
  const subject = `[ColiPop Contact] Mesaj nou de la ${name.trim()}`;
  const adminHtml = `
    <h2>Mesaj nou de contact - ColiPop</h2>
    <p><strong>Nume:</strong> ${name.trim()}</p>
    <p><strong>Email:</strong> ${email.trim()}</p>
    <p><strong>Mesaj:</strong></p>
    <blockquote style="border-left: 4px solid #e8b86d; padding-left: 10px; margin-left: 0;">
      ${message.trim().replace(/\n/g, "<br/>")}
    </blockquote>
    <hr/>
    <p><small>Acest mesaj a fost trimis automat de pe site-ul ColiPop.</small></p>
  `;

  // 0. Primary: Nodemailer (Gmail/SMTP) with Client Confirmation
  const mailRes = await sendEmail({
    to: NOTIFICATION_EMAILS[0],
    cc: NOTIFICATION_EMAILS.slice(1).join(","),
    replyTo: email.trim(),
    subject,
    html: adminHtml,
  });

  if (mailRes.success) {
    // Send auto-confirmation to client
    const clientHtml = `
      <h2>Salut ${name.trim()},</h2>
      <p>Am primit mesajul tău și îți mulțumim că ne-ai contactat.</p>
      <p>Echipa ColiPop va analiza solicitarea ta și vom reveni cu un răspuns în cel mai scurt timp posibil.</p>
      <br/>
      <p>Cu drag,</p>
      <p><strong>Echipa ColiPop</strong></p>
      <p><a href="https://colipop.ro">www.colipop.ro</a></p>
    `;
    await sendEmail({
      to: email.trim(),
      subject: "Confirmare primire mesaj - ColiPop",
      html: clientHtml,
    });
    return { success: true };
  }

  // Fallbacks (Web3Forms, FormSubmit, etc.) if local SMTP fails
  // 1. Web3Forms
  const web3formsKey = process.env.WEB3FORMS_KEY;
  if (web3formsKey) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject,
          from_name: "ColiPop Website",
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          to: NOTIFICATION_EMAILS[0],
          cc: NOTIFICATION_EMAILS.slice(1).join(","),
        }),
      });
      if (res.ok) return { success: true };
    } catch { }
  }

  // 2. FormSubmit.co
  try {
    const res = await fetch("https://formsubmit.co/ajax/lambru_george@yahoo.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        _subject: subject,
        _cc: "sc.colipop.sr@gmail.com",
        _template: "box",
        _captcha: "false",
        nume: name.trim(),
        email: email.trim(),
        mesaj: message.trim(),
        privacy: agreePrivacy ? "Da" : "Nu"
      })
    });
    if (res.ok) return { success: true };
  } catch (e) {
    console.error("FormSubmit error:", e);
  }

  // 3. Formspree
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: subject,
          _cc: NOTIFICATION_EMAILS.join(","),
        }),
      });
      if (res.ok) return { success: true };
    } catch { }
  }

  // 4. Local Log Fallback
  console.log(`[Contact] Fallback log: From ${email} - ${message.substring(0, 50)}...`);
  return { success: true };
}
