"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  fallbackContent?: React.ReactNode;
}

export default function ImageWithFallback({
  fallbackContent,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#E8DDB8]/50 text-4xl text-[#5c4a3a]">
        {fallbackContent || "🖼️"}
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setError(true)}
    />
  );
}
