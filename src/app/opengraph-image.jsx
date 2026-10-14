import { ImageResponse } from "next/og";

export const alt = "Gilmer Perez | Digital Growth Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// * Brand colors mirror the dark theme tokens in globals.css
const BG_COLOR = "hsl(0, 0%, 5%)";
const PRIMARY = "hsl(204, 100%, 50%)";
const TEXT = "hsl(0, 0%, 90%)";

// * Generated at build time so the social card always matches the site's positioning
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "80px",
          color: TEXT,
          background: BG_COLOR,
          flexDirection: "column",
          justifyContent: "space-between",
          borderLeft: `16px solid ${PRIMARY}`,
        }}
      >
        <div style={{ fontSize: 36, letterSpacing: 6, color: PRIMARY, fontWeight: 700 }}>GILMERPEREZ</div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05 }}>DIGITAL GROWTH</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.05, color: PRIMARY }}>SPECIALIST.</div>
        </div>

        <div style={{ fontSize: 34 }}>Web Development · SEO · Paid Media · Analytics</div>
      </div>
    ),
    size
  );
}
