import { ImageResponse } from "next/og";
import { business } from "@/lib/config/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = business.name;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0E0D0C 0%, #2B2925 55%, #3A362F 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            display: "flex",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#D9C7A6",
          }}
        >
          {business.address.city}, {business.address.state} · Laser Studio
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            color: "#FAF7F2",
            fontWeight: 600,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.15,
          }}
        >
          Fade the Past. Reveal What&apos;s Next.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 28,
            color: "#A79C8C",
          }}
        >
          {business.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
