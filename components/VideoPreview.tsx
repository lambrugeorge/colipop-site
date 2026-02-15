"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

type VideoPreviewProps = {
    src: string;
};

export default function VideoPreview({ src }: VideoPreviewProps) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <div className="h-64 bg-black relative border-b border-[#E8DDB8] group">
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                playsInline
            >
                <source src={src} type="video/mp4" />
            </video>

            {!playing && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer group-hover:bg-black/20 transition-all"
                    onClick={handlePlay}
                >
                    <div className="bg-white/90 backdrop-blur p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                        <Play size={32} className="text-[#1a1510] ml-1" />
                    </div>
                </div>
            )}
        </div>
    );
}
