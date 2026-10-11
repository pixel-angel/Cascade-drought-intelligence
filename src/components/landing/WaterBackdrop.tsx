
export default function WaterBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="cascade-ocean pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ocean-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#123B48" stopOpacity=".68" />
            <stop offset="50%" stopColor="#087C91" stopOpacity=".36" />
            <stop offset="100%" stopColor="#06110D" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="ocean-depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity=".48" />
            <stop offset="25%" stopColor="#087D86" stopOpacity=".27" />
            <stop offset="65%" stopColor="#0A392E" stopOpacity=".65" />
            <stop offset="100%" stopColor="#06110D" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="ocean-horizon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
            <stop offset="25%" stopColor="#67E8F9" stopOpacity=".8" />
            <stop offset="50%" stopColor="#ECFEFF" stopOpacity=".95" />
            <stop offset="75%" stopColor="#67E8F9" stopOpacity=".8" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="ocean-glow">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity=".3" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>

          <filter id="ocean-ripple">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".012 .075"
              numOctaves="2"
              seed="7"
            />
            <feColorMatrix
              type="saturate"
              values="0"
            />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 .19" />
            </feComponentTransfer>
          </filter>

          <filter id="ocean-soft-glow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Atmospheric glow above the waterline */}
        <rect width="1440" height="900" fill="url(#ocean-sky)" />

        <ellipse
          cx="720"
          cy="345"
          rx="650"
          ry="210"
          fill="url(#ocean-glow)"
        />

        {/* Deep water body */}
        <path
          d="M0 390 Q180 370 360 392 T720 386 T1080 395 T1440 380 V900 H0Z"
          fill="url(#ocean-depth)"
        />

        {/* Distant underwater light shafts */}
        <g opacity=".12">
          <path d="M170 400 L320 400 L490 820 L365 820Z" fill="#67E8F9" />
          <path d="M590 390 L650 390 L800 770 L735 770Z" fill="#A5F3FC" />
          <path d="M1040 390 L1110 390 L1280 790 L1190 790Z" fill="#06B6D4" />
        </g>

        {/* Moving water layers */}
        <g className="cascade-wave cascade-wave-back">
          <path
            d="M-300 388 Q-150 365 0 388 T300 388 T600 388 T900 388 T1200 388 T1500 388 T1800 388 V900 H-300Z"
            fill="#06B6D4"
            fillOpacity=".12"
          />
        </g>

        <g className="cascade-wave cascade-wave-front">
          <path
            d="M-400 402 Q-250 382 -100 402 T200 402 T500 402 T800 402 T1100 402 T1400 402 T1700 402 V900 H-400Z"
            fill="#10B981"
            fillOpacity=".10"
          />
        </g>

        {/* Fine procedural ripples */}
        <rect
          x="0"
          y="385"
          width="1440"
          height="360"
          filter="url(#ocean-ripple)"
          opacity=".35"
        />

        {/* Luminous horizon */}
        <path
          d="M0 389 Q180 374 360 389 T720 388 T1080 391 T1440 385"
          fill="none"
          stroke="#67E8F9"
          strokeWidth="14"
          opacity=".18"
          filter="url(#ocean-soft-glow)"
        />

        <path
          d="M0 389 Q180 374 360 389 T720 388 T1080 391 T1440 385"
          fill="none"
          stroke="url(#ocean-horizon)"
          strokeWidth="2"
        />

        <path
          d="M0 396 Q180 387 360 396 T720 394 T1080 399 T1440 393"
          fill="none"
          stroke="#BAF7FF"
          strokeWidth=".8"
          opacity=".45"
        />

        {/* Small surface reflections */}
        <g fill="#A5F3FC" opacity=".35">
          <path d="M100 414 h70" stroke="#A5F3FC" strokeWidth="1" />
          <path d="M430 423 h110" stroke="#A5F3FC" strokeWidth="1" />
          <path d="M880 414 h85" stroke="#A5F3FC" strokeWidth="1" />
          <path d="M1180 425 h130" stroke="#A5F3FC" strokeWidth="1" />
        </g>

        {/* Darken the lower edge to blend into the page */}
        <linearGradient id="ocean-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06110D" stopOpacity="0" />
          <stop offset="100%" stopColor="#06110D" stopOpacity="1" />
        </linearGradient>

        <rect
          x="0"
          y="660"
          width="1440"
          height="240"
          fill="url(#ocean-fade)"
        />
      </svg>

      {/* Soft vignette keeps the hero text readable */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#06110D_0%,rgba(6,17,13,0.78)_27%,rgba(6,17,13,0.12)_70%,rgba(6,17,13,0.4)_100%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,13,0.12)_0%,transparent_30%,#06110D_100%)]" />
    </div>
  );
}
