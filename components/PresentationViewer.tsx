"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function PresentationViewer() {
  const t = useTranslations("about");
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const origin = window.location.origin;
    const url = `${origin}/prezentare.pptx`;
    setSrc(url);
  }, []);

  if (!src) return null;

  const embedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;

  return (
    <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border-2 border-[#E8DDB8] bg-[#FFFEF7]">
      <iframe
        title={t("presentation_view")}
        src={embedUrl}
        className="h-full min-h-[360px] w-full"
        allowFullScreen
      />
    </div>
  );
}
