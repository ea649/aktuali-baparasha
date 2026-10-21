// יוצר את סדרת האייקונים של האתר דרך OpenAI Images API (חשבון רשת חב"ד)
// הרצה: node tools/make-icons.mjs  — לא דורס קבצים קיימים
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const envFile = fs.readFileSync(path.join(os.homedir(), ".chabad-openai.env"), "utf8");
const KEY = envFile.match(/OPENAI_API_KEY=(\S+)/)[1];
const OUT = path.resolve("images/icons-src");
fs.mkdirSync(OUT, { recursive: true });

const STYLE = "A single 3D icon, glossy soft plastic / clay render like a premium app icon, rounded chunky shapes, smooth gradients, soft studio lighting, gentle shadow under the object, playful and modern for kids, centered, filling about 80% of the frame, isolated on a fully transparent background, no text, no letters, no frame, no background shape.";
const ICONS = {
  heart: "a plump glossy pink-magenta heart (#ee2f62) with a small white highlight sparkle",
  dice: "two playful rounded dice, one sunny yellow (#fdb916) and one white, with navy dots, tumbling",
  clapper: "a movie clapperboard in cyan (#1dbcd7) and white stripes, slightly open",
  medal: "a shiny gold medal with a star in the middle hanging on a purple (#aa479a) ribbon",
  headphones: "a pair of chunky over-ear headphones in violet (#7b4fc4) with lilac cushions",
  mic: "a retro stage microphone on a short stand, warm orange-yellow (#f5a400) body with a silver grille",
  present: "a classroom projector screen / smart board showing a big white play triangle, navy (#1b0559) frame",
  download: "a round pink (#ee2f62) badge with a thick white downward arrow",
  print: "a cute rounded printer in white and cyan (#1dbcd7) with a sheet of paper coming out",
  home: "a small cozy house with a yellow (#fdb916) roof and pink walls with a round window",
  fullscreen: "a rounded square navy (#1b0559) button with four white corner arrows pointing outward",
  zoom: "a chunky magnifying glass with a yellow (#fdb916) handle and a shiny glass lens",
  gamepad: "a rounded game controller in pink (#ee2f62) with yellow and cyan buttons",
  star: "a puffy five-pointed golden yellow (#fdb916) star",
  scroll: "a Torah scroll (two wooden handles, rolled parchment) cute and rounded, parchment beige with gold tips",
  trophy: "a shiny gold trophy cup with two handles",
  eye: "a big friendly cartoon eye looking forward, white with a cyan (#1dbcd7) iris",
  check: "a thick rounded green check mark (#22c55e)",
  cross: "a thick rounded red X mark (#e11d48)",
  sparkle: "a cluster of three four-pointed sparkles in yellow, pink and cyan"
};

async function make(name, subject) {
  const file = path.join(OUT, `${name}.png`);
  if (fs.existsSync(file)) return console.log("קיים, דילוג:", name);
  const body = { model: "gpt-image-2.5-flare", prompt: `${subject}. ${STYLE}`, size: "1024x1024", quality: "medium", output_format: "png", background: "transparent", n: 1 };
  let res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST", headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" }, body: JSON.stringify(body)
  });
  let j = await res.json();
  if (!res.ok) return console.log("שגיאה", name, res.status, j.error?.code, j.error?.message);
  fs.writeFileSync(file, Buffer.from(j.data[0].b64_json, "base64"));
  console.log("נוצר", name, "טוקני פלט:", j.usage?.output_tokens);
}

const names = Object.keys(ICONS);
for (let i = 0; i < names.length; i += 5) {
  await Promise.all(names.slice(i, i + 5).map(n => make(n, ICONS[n])));
}
