"use client";

import { useEffect, useState } from "react";
import { FilePieChart } from "lucide-react";

type PptxViewerProps = {
    src: string;
};

export default function PptxViewer({ src }: PptxViewerProps) {
    const [fullUrl, setFullUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Create a full URL for the Microsoft Office Viewer
            const url = new URL(src, window.location.origin).toString();
            setFullUrl(url);
        }
    }, [src]);

    // If we're on localhost, Microsoft Viewer won't work because it can't access the file
    const isLocal = fullUrl.includes("localhost") || fullUrl.includes("127.0.0.1");

    if (isLocal) {
        return (
            <div className="h-64 bg-gradient-to-br from-[#e8b86d]/20 to-[#FACE68]/40 flex flex-col items-center justify-center p-6 text-center border-b border-[#E8DDB8]">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 text-[#e8b86d]">
                    <FilePieChart size={32} />
                </div>
                <h4 className="font-bold text-[#1a1510] mb-1">Previzualizare indisponibilă local</h4>
                <p className="text-xs text-[#5c4a3a]">Microsoft Viewer necesită un site public. Vizualizarea va funcționa după publicarea site-ului.</p>
                <p className="text-xs mt-2 font-medium text-amber-600">Utilizați butonul de descărcare de mai jos.</p>
            </div>
        );
    }

    return (
        <div className="h-64 border-b border-[#E8DDB8] overflow-hidden">
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Prezentare Firmă"
            >
                Acest browser nu suportă iframe-uri.
            </iframe>
        </div>
    );
}
