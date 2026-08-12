"use client";

import { useRef, useState } from "react";

// Video sonuna yaklaşırken karart, başa sarınca tekrar aç — kesintisiz loop hissi
const FADE_SECONDS = 0.9;

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [dim, setDim] = useState(false);

  return (
    <>
      <video
        ref={ref}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 size-full object-cover"
        onTimeUpdate={() => {
          const v = ref.current;
          if (!v || !v.duration) return;
          setDim(v.duration - v.currentTime <= FADE_SECONDS);
        }}
        onEnded={() => {
          const v = ref.current;
          if (!v) return;
          v.currentTime = 0;
          void v.play();
          setDim(false);
        }}
      >
        <source src="/medya/hero.mp4" type="video/mp4" />
      </video>
      <div
        className={`pointer-events-none absolute inset-0 bg-navy-950 transition-opacity duration-700 ${
          dim ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
