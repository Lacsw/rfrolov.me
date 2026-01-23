import { ImageResponse } from "next/og";

import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = "Roman Frolov - Frontend Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 600,
            margin: 0,
          }}
        >
          Roman Frolov
        </h1>
        <p
          style={{
            fontSize: 36,
            color: "#a1a1aa",
            margin: 0,
          }}
        >
          Frontend Developer
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 24,
            color: "#71717a",
            fontSize: 24,
          }}
        >
          <span
            style={{
              backgroundColor: "#27272a",
              padding: "8px 16px",
              borderRadius: 8,
            }}
          >
            React
          </span>
          <span
            style={{
              backgroundColor: "#27272a",
              padding: "8px 16px",
              borderRadius: 8,
            }}
          >
            TypeScript
          </span>
          <span
            style={{
              backgroundColor: "#27272a",
              padding: "8px 16px",
              borderRadius: 8,
            }}
          >
            Next.js
          </span>
        </div>
      </div>
      <p
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 24,
          color: "#71717a",
        }}
      >
        rfrolov.me
      </p>
    </div>,
    { ...size }
  );
}
