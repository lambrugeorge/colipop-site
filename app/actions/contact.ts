"use server";

export type ContactResult = { success: boolean; error?: string };

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


  // Opțional: trimitere prin Formspree (setează FORMSPREE_ID în .env)
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
          _subject: "Contact ColiPop",
        }),
      });
      if (!res.ok) return { success: false, error: "send_failed" };
    } catch {
      return { success: false, error: "send_failed" };
    }
  }
  // Fără Formspree: considerăm succes (poți adăuga mai târziu Resend/Nodemailer)
  return { success: true };
}
