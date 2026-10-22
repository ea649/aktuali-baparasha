// בונה את assets/parashot.js — לוח הפרשות של ארץ ישראל (מ-Hebcal) לכמה שנים קדימה.
// הרצה: node tools/make-parashot.mjs [שנה-עברית-ראשונה] [מספר-שנים]   (ברירת מחדל: 5786, 6 שנים)
import fs from "node:fs";

const first = +(process.argv[2] || 5786), count = +(process.argv[3] || 6);

/* סדר הפרשות בתורה, החומש של כל אחת, ואיות מלא ומוכר לילדים */
const BOOKS = ["בראשית", "שמות", "ויקרא", "במדבר", "דברים"];
const CANON = [
  [0, "Bereshit", "בראשית"], [0, "Noach", "נח"], [0, "Lech-Lecha", "לך לך"], [0, "Vayera", "וירא"], [0, "Chayei Sara", "חיי שרה"],
  [0, "Toldot", "תולדות"], [0, "Vayetzei", "ויצא"], [0, "Vayishlach", "וישלח"], [0, "Vayeshev", "וישב"], [0, "Miketz", "מקץ"],
  [0, "Vayigash", "ויגש"], [0, "Vayechi", "ויחי"],
  [1, "Shemot", "שמות"], [1, "Vaera", "וארא"], [1, "Bo", "בא"], [1, "Beshalach", "בשלח"], [1, "Yitro", "יתרו"], [1, "Mishpatim", "משפטים"],
  [1, "Terumah", "תרומה"], [1, "Tetzaveh", "תצווה"], [1, "Ki Tisa", "כי תשא"], [1, "Vayakhel", "ויקהל"], [1, "Pekudei", "פקודי"],
  [2, "Vayikra", "ויקרא"], [2, "Tzav", "צו"], [2, "Shmini", "שמיני"], [2, "Tazria", "תזריע"], [2, "Metzora", "מצורע"],
  [2, "Achrei Mot", "אחרי מות"], [2, "Kedoshim", "קדושים"], [2, "Emor", "אמור"], [2, "Behar", "בהר"], [2, "Bechukotai", "בחוקותי"],
  [3, "Bamidbar", "במדבר"], [3, "Nasso", "נשא"], [3, "Beha'alotcha", "בהעלותך"], [3, "Sh'lach", "שלח לך"], [3, "Korach", "קורח"],
  [3, "Chukat", "חוקת"], [3, "Balak", "בלק"], [3, "Pinchas", "פינחס"], [3, "Matot", "מטות"], [3, "Masei", "מסעי"],
  [4, "Devarim", "דברים"], [4, "Vaetchanan", "ואתחנן"], [4, "Eikev", "עקב"], [4, "Re'eh", "ראה"], [4, "Shoftim", "שופטים"],
  [4, "Ki Teitzei", "כי תצא"], [4, "Ki Tavo", "כי תבוא"], [4, "Nitzavim", "ניצבים"], [4, "Vayeilech", "וילך"], [4, "Ha'azinu", "האזינו"],
  [4, "Vezot Haberakhah", "וזאת הברכה"]
];
const slug = s => s.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-");
const byEn = Object.fromEntries(CANON.map(([b, en, he]) => [en, { id: slug(en), he, b }]));

const names = {};   // id → [שם, חומש]
const weeks = [];   // [תאריך השבת, id]
for (let y = first; y < first + count; y++) {
  const url = `https://www.hebcal.com/hebcal?v=1&cfg=json&s=on&il=on&year=${y}&yt=H&maj=off&min=off&mod=off&nx=off&mf=off&ss=off&c=off`;
  const data = await (await fetch(url)).json();
  for (const it of data.items.filter(i => i.category === "parashat")) {
    const parts = it.title.replace(/^Parashat /, "").replace(/[’‘]/g, "'").split("-").reduce((acc, p) => {
      // "Lech-Lecha" ו-"Nitzavim-Vayeilech": מחברים בחזרה חלקים שאינם פרשה בפני עצמה
      if (acc.length && !byEn[p] && byEn[acc[acc.length - 1] + "-" + p]) acc[acc.length - 1] += "-" + p; else acc.push(p);
      return acc;
    }, []);
    const ps = parts.map(p => byEn[p]);
    if (ps.some(p => !p)) throw new Error("פרשה לא מוכרת: " + it.title);
    const id = ps.map(p => p.id).join("--");
    names[id] = [ps.map(p => p.he).join("-"), ps[0].b];
    weeks.push([it.date, id]);
  }
}
const last = byEn["Vezot Haberakhah"];
names[last.id] = [last.he, last.b];

const out = `/*
  ===== לוח הפרשות — נוצר אוטומטית ב-tools/make-parashot.mjs (לוח ארץ ישראל מ-Hebcal) =====
  לא עורכים ידנית. כדי להאריך לשנים נוספות: node tools/make-parashot.mjs <שנה עברית> <מספר שנים>
  טווח: ${weeks[0][0]} עד ${weeks[weeks.length - 1][0]}
*/
window.PARASHOT = {
  books: ${JSON.stringify(BOOKS)},
  last: "${last.id}",
  names: ${JSON.stringify(names, null, 0).replace(/\],"/g, '],\n    "')},
  weeks: ${JSON.stringify(weeks).replace(/\],\[/g, "],\n    [")}
};
`;
fs.writeFileSync("assets/parashot.js", out);
console.log("נכתב assets/parashot.js:", weeks.length, "שבתות,", Object.keys(names).length, "פרשות");
