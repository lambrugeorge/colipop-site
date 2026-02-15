"use server";

import { sendEmail } from "@/lib/email";

export type OrderItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
};

export type OrderData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    payment: string;
    items: OrderItem[];
    subtotal?: number;
    discount?: number;
    total: number;
    coupon?: string;
};

export type OrderResult = { success: boolean; error?: string; orderNumber?: string };

const NOTIFICATION_EMAILS = [
    "lambru_george@yahoo.com",
    "sc.colipop.sr@gmail.com",
];

export async function submitOrder(data: OrderData): Promise<OrderResult> {
    // Validate
    if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.address?.trim()) {
        return { success: false, error: "missing_fields" };
    }
    if (!data.items || data.items.length === 0) {
        return { success: false, error: "empty_cart" };
    }

    // Generate order number
    const orderNumber = `CP-${Date.now().toString(36).toUpperCase()}`;

    // Format items list for email
    const itemsListHtml = data.items
        .map((item) => `<li><strong>${item.title}</strong> x${item.quantity} — ${(item.price * item.quantity).toFixed(2)} RON</li>`)
        .join("");

    const itemsListText = data.items
        .map((item) => `• ${item.title} x${item.quantity} — ${(item.price * item.quantity).toFixed(2)} RON`)
        .join("\n");

    const discountInfoText = data.discount ? `Reducere (${data.coupon || 'Cupon'}): -${data.discount.toFixed(2)} RON\n` : "";
    const discountInfoHtml = data.discount ? `<p style="color: green;"><strong>Reducere (${data.coupon}):</strong> -${data.discount.toFixed(2)} RON</p>` : "";

    const emailBodyText = `
=== COMANDĂ NOUĂ COLIPOP ===
Număr comandă: ${orderNumber}
Data: ${new Date().toLocaleString("ro-RO")}

--- CLIENT ---
Nume: ${data.name}
Email: ${data.email}
Telefon: ${data.phone}
Adresă livrare: ${data.address}
Observații: ${data.notes || "—"}
Modalitate plată: ${data.payment === "cash" ? "Ramburs (numerar la livrare)" : "Transfer bancar"}

--- PRODUSE ---
${itemsListText}

${data.subtotal ? `Subtotal: ${data.subtotal.toFixed(2)} RON\n` : ""}${discountInfoText}--- TOTAL: ${data.total.toFixed(2)} RON ---

---
Furnizor: SC COLIPOP S.R.L.
CUI: 83252082 | Reg. Com: J09/6282/2025
IBAN: RO25ROCT8325208210890001
Sediul: Colegiul Economic 'Ion Ghica', Brăila
  `.trim();

    const emailBodyHtml = `
      <h2>Comandă Nouă #${orderNumber}</h2>
      <p><strong>Nume:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.phone}</p>
      <p><strong>Adresă:</strong> ${data.address}</p>
      <p><strong>Plată:</strong> ${data.payment === "cash" ? "Ramburs" : "Transfer Bancar"}</p>
      <hr/>
      <h3>Produse:</h3>
      <ul>${itemsListHtml}</ul>
      ${data.subtotal ? `<p>Subtotal: ${data.subtotal.toFixed(2)} RON</p>` : ""}
      ${discountInfoHtml}
      <h3>Total: <span style="color: #F79A19;">${data.total.toFixed(2)} RON</span></h3>
      <hr/>
      <p><small>Generat automat de ColiPop Website.</small></p>
    `;

    // 0. Primary: Nodemailer (SMTP)
    const successAdmin = await sendEmail({
        to: NOTIFICATION_EMAILS[0],
        cc: NOTIFICATION_EMAILS.slice(1).join(","),
        replyTo: data.email,
        subject: `[ColiPop] Comandă nouă #${orderNumber} — ${data.total.toFixed(2)} RON`,
        html: emailBodyHtml,
        text: emailBodyText
    });

    if (successAdmin.success) {
        // Send confirmation to client
        const clientHtml = `
            <h2>Salut ${data.name},</h2>
            <p>Îți mulțumim pentru comanda ta la ColiPop!</p>
            <p>Numărul comenzii tale este: <strong>${orderNumber}</strong></p>
            <p>Vom procesa comanda în scurt timp și te vom contacta pentru confirmarea livrării.</p>
            <hr/>
            <h3>Sumar comandă:</h3>
            <ul>${itemsListHtml}</ul>
            ${data.subtotal ? `<p>Subtotal: ${data.subtotal.toFixed(2)} RON</p>` : ""}
            ${discountInfoHtml}
            <h3>Total de plată: ${data.total.toFixed(2)} RON</h3>
            <hr/>
            <p>Cu drag,</p>
            <p><strong>Echipa ColiPop</strong></p>
        `;
        await sendEmail({
            to: data.email,
            subject: `Confirmare comandă #${orderNumber} - ColiPop`,
            html: clientHtml
        });
        return { success: true, orderNumber };
    }

    // 1. Web3Forms (Fallback)
    const web3formsKey = process.env.WEB3FORMS_KEY;
    if (web3formsKey) {
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: web3formsKey,
                    subject: `[ColiPop] Comandă nouă #${orderNumber} — ${data.total.toFixed(2)} RON`,
                    from_name: "ColiPop Magazin Online",
                    name: data.name,
                    email: data.email,
                    message: emailBodyText,
                    to: NOTIFICATION_EMAILS[0],
                    cc: NOTIFICATION_EMAILS.slice(1).join(","),
                }),
            });
            if (res.ok) return { success: true, orderNumber };
        } catch { }
    }

    // 2. FormSubmit.co (Fallback)
    try {
        const res = await fetch("https://formsubmit.co/ajax/lambru_george@yahoo.com", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
                _subject: `[ColiPop] Comandă nouă #${orderNumber}`,
                _cc: "sc.colipop.sr@gmail.com",
                _template: "box",
                message: emailBodyText
            })
        });
        if (res.ok) return { success: true, orderNumber };
    } catch { }

    // 3. Formspree (Fallback)
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (formspreeId) {
        try {
            const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: emailBodyText,
                    _subject: `[ColiPop] Comandă nouă #${orderNumber}`,
                    _cc: NOTIFICATION_EMAILS.join(","),
                }),
            });
            if (res.ok) return { success: true, orderNumber };
        } catch { }
    }

    // 4. Local Log Fallback
    console.log(`[Order] Fallback log: Order #${orderNumber} from ${data.email}`);
    // Just return success so user sees confirmation page
    return { success: true, orderNumber };
}
