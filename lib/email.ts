import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 465;
const SMTP_USER = process.env.SMTP_USER || "sc.colipop.sr@gmail.com";
const SMTP_PASS = process.env.SMTP_PASSWORD;

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

export async function sendEmail({
    to,
    subject,
    html,
    text,
    replyTo,
    cc
}: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
    cc?: string;
}) {
    if (!SMTP_PASS) {
        console.warn("[Email] Password not configured (SMTP_PASSWORD missing). Skipping real email sending.");
        return { success: false, error: "not_configured" };
    }

    try {
        await transporter.sendMail({
            from: `"ColiPop Website" <${SMTP_USER}>`,
            to,
            cc,
            replyTo,
            subject,
            text,
            html,
        });
        console.log(`[Email] Sent to ${to}`);
        return { success: true };
    } catch (error) {
        console.error("[Email] Send failed:", error);
        return { success: false, error: String(error) };
    }
}
