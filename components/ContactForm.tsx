"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import { Link } from "../i18n/navigation";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorType, setErrorType] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorType(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
      setErrorType(result.error === "privacy_required" ? "privacy_required" : "send_failed");
    }
  }

  return (
    <motion.form
      className="flex flex-col gap-4 rounded-2xl border-2 border-[#E8DDB8] bg-white p-6 shadow-lg sm:p-8"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#1a1510]">{t("form_name")}</span>
          <input
            type="text"
            name="name"
            required
            className="rounded-lg border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-2.5 text-[#1a1510] placeholder-[#5c4a3a]/60 outline-none focus:border-[#F79A19] focus:ring-2 focus:ring-[#F79A19]/30"
            placeholder=""
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-[#1a1510]">{t("form_email")}</span>
          <input
            type="email"
            name="email"
            required
            className="rounded-lg border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-2.5 text-[#1a1510] placeholder-[#5c4a3a]/60 outline-none focus:border-[#F79A19] focus:ring-2 focus:ring-[#F79A19]/30"
            placeholder=""
          />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-[#1a1510]">{t("form_message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-lg border-2 border-[#E8DDB8] bg-[#FFFEF7] px-4 py-2.5 text-[#1a1510] placeholder-[#5c4a3a]/60 outline-none focus:border-[#F79A19] focus:ring-2 focus:ring-[#F79A19]/30"
          placeholder=""
        />
      </label>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-1 h-4 w-4 rounded border-[#E8DDB8] bg-[#FFFEF7] text-[#F79A19] focus:ring-[#F79A19]"
        />
        <span className="text-sm text-[#5c4a3a]">
          {t("privacy_agree")}
          <Link href="/politica-confidentialitate" className="text-[#F79A19] underline hover:text-[#e08a14]">
            {tFooter("privacy_policy")}
          </Link>
          {t("privacy_agree_suffix")}
        </span>
      </label>
      <label className="flex items-center gap-3 rounded-lg border border-[#E8DDB8] bg-[#FFFEF7] p-3 shadow-inner">
        <input
          type="checkbox"
          name="captcha"
          required
          className="h-5 w-5 rounded border-gray-300 text-[#F79A19] focus:ring-[#F79A19]"
        />
        <span className="text-sm font-medium text-[#1a1510]">{t("form_captcha")}</span>
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-xl bg-[#F79A19] px-6 py-3 text-sm font-semibold text-[#1a1510] transition-colors hover:bg-[#e08a14] disabled:opacity-60"
        >
          {status === "sending" ? t("form_sending") : t("form_send")}
        </button>
        {status === "sent" && (
          <span className="text-sm text-green-700">{t("form_success")}</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600">
            {errorType === "privacy_required"
              ? t("form_privacy_required")
              : errorType === "invalid_email"
                ? t("form_invalid_email")
                : t("form_error")}
          </span>
        )}
      </div>
    </motion.form>
  );
}
