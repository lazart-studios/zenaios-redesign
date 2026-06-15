import { ImageResponse } from "next/og";

export const alt = "ZenAiOS — The AI operating system for modern hospitals.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(900px 500px at 92% 0%, rgba(0,118,253,0.06), transparent 60%), linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top: live badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: "#4b5563",
              fontSize: 24,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#16a34a",
              }}
            />
            Live in real hospitals &amp; city institutions
          </div>
        </div>

        {/* Middle: wordmark + headline */}
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: 5,
              borderRadius: 999,
              background: "#0076fd",
              marginRight: 28,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: "#0076fd",
                letterSpacing: "-0.02em",
              }}
            >
              ZenAiOS
            </div>
            <div
              style={{
                marginTop: 18,
                fontSize: 76,
                fontWeight: 800,
                color: "#111827",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: 760,
              }}
            >
              The AI operating system for modern hospitals.
            </div>
          </div>
        </div>

        {/* Bottom: proof line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#6b7280",
          }}
        >
          <span style={{ color: "#111827", fontWeight: 600 }}>17 AI modules</span>
          <span style={{ color: "#d1d5db" }}>·</span>
          <span>3 domains</span>
          <span style={{ color: "#d1d5db" }}>·</span>
          <span>2 live deployments</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
