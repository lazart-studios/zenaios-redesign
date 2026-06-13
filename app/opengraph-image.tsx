import { ImageResponse } from "next/og";

export const alt = "ZenAiOS — The AI operating system for modern hospitals.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SWIRL_OUTER =
  "M22.12,82.58C2.71,73.23-5.48,49.83,3.87,30.42,13.21,11.01,36.61,2.82,56.03,12.16c19.41,9.35,27.6,32.75,18.26,52.16-9.35,19.41-32.75,27.6-52.16,18.26ZM52.48,19.52c-15.36-7.39-33.87-.92-41.26,14.44-7.39,15.36-.92,33.87,14.44,41.26s33.87.92,41.26-14.44c7.39-15.36.92-33.87-14.44-41.26Z";
const SWIRL_INNER =
  "M61.95,2.3c24.85,8.04,38.53,34.79,30.49,59.65-8.04,24.85-34.79,38.53-59.65,30.49C7.95,84.41-5.73,57.65,2.3,32.8,10.34,7.94,37.1-5.73,61.95,2.3ZM35.84,83.02c19.66,6.36,40.82-4.46,47.18-24.12,6.36-19.66-4.46-40.82-24.12-47.18-19.66-6.36-40.82,4.46-47.18,24.12-6.36,19.66,4.46,40.82,24.12,47.18Z";

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
            "radial-gradient(900px 600px at 85% 15%, rgba(0,118,253,0.28), transparent 60%), radial-gradient(700px 500px at 10% 90%, rgba(113,190,255,0.12), transparent 55%), linear-gradient(135deg, #02081c 0%, #06164a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Swirl motif */}
        <svg
          width="540"
          height="540"
          viewBox="-10 -10 115 115"
          style={{ position: "absolute", right: -70, top: 40, opacity: 0.5 }}
        >
          <defs>
            <linearGradient id="og-g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0.2" stopColor="#0076fd" />
              <stop offset="1" stopColor="#71beff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="og-g2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0.1" stopColor="#0076fd" />
              <stop offset="1" stopColor="#71beff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={SWIRL_OUTER} fill="url(#og-g1)" />
          <path d={SWIRL_INNER} fill="url(#og-g2)" />
        </svg>

        {/* Top: live badge */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(113,190,255,0.25)",
              color: "#9db4d9",
              fontSize: 24,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#33d6a6",
              }}
            />
            Live in real hospitals &amp; city institutions
          </div>
        </div>

        {/* Middle: wordmark + headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#71beff",
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
              color: "#eaf2ff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 760,
            }}
          >
            The AI operating system for modern hospitals.
          </div>
        </div>

        {/* Bottom: proof line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 26,
            color: "#9db4d9",
          }}
        >
          <span style={{ color: "#eaf2ff", fontWeight: 600 }}>17 AI modules</span>
          <span style={{ color: "#6b82ac" }}>·</span>
          <span>3 domains</span>
          <span style={{ color: "#6b82ac" }}>·</span>
          <span>2 live deployments</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
