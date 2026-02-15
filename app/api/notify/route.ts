import { NextRequest, NextResponse } from "next/server";

// This API route logs order/contact notifications.
// In production, integrate with a proper email service (Resend, SendGrid, etc.)
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const timestamp = new Date().toISOString();

        // Log to console (visible in server logs)
        console.log("========================================");
        console.log(`[${timestamp}] NOTIFICARE ${(data.type || "unknown").toUpperCase()}`);
        console.log("Destinatari:", data.notifyEmails?.join(", ") || "N/A");
        console.log("========================================");

        if (data.type === "order") {
            console.log(`Comandă #${data.orderNumber}`);
            console.log(`Client: ${data.name} | ${data.email} | ${data.phone}`);
            console.log(`Adresă: ${data.address}`);
            console.log(`Plată: ${data.payment}`);
            console.log(`Total: ${data.total} RON`);
            console.log(`Produse: ${data.items?.length || 0} articole`);
            if (data.emailBody) {
                console.log("\n" + data.emailBody);
            }
        } else if (data.type === "contact") {
            console.log(`De la: ${data.name} <${data.email}>`);
            console.log(`Mesaj: ${data.message}`);
        }

        console.log("========================================\n");

        return NextResponse.json({ success: true, timestamp });
    } catch (err) {
        console.error("[API/notify] Error:", err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
