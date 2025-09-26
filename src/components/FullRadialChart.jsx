"use client";
import React, { useMemo } from "react";

/**
 * FullRadialChart
 * - value: number 0..100 (percentage)
 * - size: px (width/height)
 * - strokeWidth: ring thickness
 * - label: subtitle (e.g. "OEE")
 */
export default function FullRadialChart({
  value = 75,
  size = 160,
  strokeWidth = 14,
  label = "OEE",
}) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  const radius = useMemo(() => (size - strokeWidth) / 2, [size, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const dashoffset = useMemo(
    () => circumference * (1 - pct / 100),
    [circumference, pct]
  );

  // threshold color logic - adjust to your taste
  const color = useMemo(() => {
    if (pct < 50) return "#ff4d4f"; // red
    if (pct < 75) return "#F7931E"; // yellow
    return "#14E240"; // green
  }, [pct]);

  // You can optionally use a gradient based on color and a base color:
  const gradientId = `grad-${Math.round(size)}-${Math.round(pct)}`;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {/* tweak stop colors if you want multi-color gradient */}
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* rotate -90 so the arc starts at 12 o'clock */}
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Orange arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#f7931e"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference * 0.0}
            />
            {/* Red arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#ff4d4f"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference * 0.48} ${circumference}`}
              strokeDashoffset={circumference * 0.0}
            />

            {/* Green arc */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#14e240"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference * 0.3} ${circumference}`}
              strokeDashoffset={circumference * 0.575}
            />
          </svg>
          {/* background track */}

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#eef2f7ca"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* foreground arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashoffset}
            style={{
              transition:
                "stroke-dashoffset 700ms cubic-bezier(.2,.8,.2,1), stroke 300ms ease",
              transformOrigin: "50% 50%",
            }}
          />
        </g>
      </svg>

      {/* Center label (perfectly centered) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontSize: Math.round(size * 0.24),
            fontWeight: 700,
            lineHeight: 1,
            color: "#111827",
          }}
        >
          {Math.round(pct)}%
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: Math.round(size * 0.11),
            color: "#6b7280",
            letterSpacing: 0.6,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
