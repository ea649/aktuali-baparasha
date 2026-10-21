// רקע אולפן פודקאסט לפרשה פודקאסט — OpenAI Images API (חשבון רשת חב"ד). לא דורס קבצים קיימים.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const KEY = fs.readFileSync(path.join(os.homedir(), ".chabad-openai.env"), "utf8").match(/OPENAI_API_KEY=(\S+)/)[1];
let file = path.resolve("images/podcast-studio.png");
for (let v = 2; fs.existsSync(file); v++) file = path.resolve(`images/podcast-studio_v${v}.png`);

const prompt = "Wide photo of a modern, colorful kids' podcast studio, empty, no people, shot straight on at seated eye level, to be projected on a classroom screen behind two students. "
  + "Back wall covered with acoustic foam panels in violet and lilac tones (#7b4fc4, #b98ee6) with soft magenta and cyan LED accent strips, a glowing round neon light shape (no letters), "
  + "a few shelves with plants and a small bookshelf with Jewish books, warm bokeh lights. In the lower part, a wooden podcast desk with two professional microphones on boom arms "
  + "facing each other at left and right, two pairs of headphones, a small mixing console in the middle. Center of the image kept fairly clean. "
  + "Bright, cheerful, high-end, realistic photography, soft depth of field. No text, no letters, no logos, no people.";

const res = await fetch("https://api.openai.com/v1/images/generations", {
  method: "POST", headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "gpt-image-2.5-flare", prompt, size: "1536x1024", quality: "high", output_format: "png", n: 1 })
});
const j = await res.json();
if (!res.ok) { console.log("שגיאה", res.status, j.error?.code, j.error?.message); process.exit(1); }
fs.writeFileSync(file, Buffer.from(j.data[0].b64_json, "base64"));
console.log("נוצר", file, "טוקני פלט:", j.usage?.output_tokens);
