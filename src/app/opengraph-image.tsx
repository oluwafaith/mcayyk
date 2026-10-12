import { ImageResponse } from "next/og";


export const alt = "MC AYYK, Master Of Ceremonies for Parties, Weddings and Corporate Events";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Open Graph share image, generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #f7f6f3 0%, #ededed 60%, #e4dccb 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontFamily: "serif", fontWeight: 700, color: "#8c6a1f" }}>
          MC AYYK
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 16,
            fontSize: 124,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            backgroundImage: "linear-gradient(100deg, #a8801a, #b48a1c 40%, #6e6248)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          <span>Master Of</span>
          <span>Ceremonies</span>
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: 40, fontSize: 36, fontWeight: 700, color: "#1a1a1a" }}>
          <span>+ Parties</span>
          <span>+ Wedding</span>
          <span>+ Corporate Events</span>
        </div>
        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 70,
            display: "flex",
            padding: "16px 30px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #6e5214, #9c771b)",
            color: "#fff",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          Book Now
        </div>
      </div>
    ),
    size,
  );
}
