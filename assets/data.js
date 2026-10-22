/*
  ===== אקטואלי בפרשה — קובץ התוכן =====
  topics    — ששת הנושאים הקבועים (לא משתנים משבוע לשבוע).
  materials — החומרים של כל פרשה. כל שבוע מוסיפים כאן פרשה חדשה,
              ושמים את הקבצים שלה בתיקייה assets/p/<מזהה הפרשה>/ (הנתיבים כאן הם בתוך התיקייה הזו).
              את מזהה הפרשה מוצאים ב-assets/parashot.js (למשל "lech-lecha", "nitzavim--vayeilech").
  נושא שאין לו חומרים בפרשה מסוימת — מופיע באתר כ"בקרוב".
*/
window.SITE = {
  topics: [
    { id: "pgisha", title: "פגישה עם הפרשה", tagline: "מצגת פתיחה שמכירה לתלמידים את הפרשה",
      color: "#ee2f62", soft: "#fcd7e1", char: "assets/img/pgisha.webp", icon: "heart", kind: "slides" },
    { id: "play", title: "פרשה PLAY", tagline: "משחק נכון / לא נכון — כל הכיתה בתנועה",
      color: "#f5a400", soft: "#ffeec2", char: "assets/img/play.webp", icon: "dice", kind: "slides" },
    { id: "live", title: "פרשה LIVE", tagline: "צופים בסרטון — ואז בודקים כמה טוב הקשבנו",
      color: "#14a9c4", soft: "#cdeef4", char: "assets/img/live.webp", icon: "clapper", kind: "video" },
    { id: "aluf", title: "אלוף הפרשה", tagline: "תפזורת עם מסר סודי",
      color: "#aa479a", soft: "#f3d9ee", char: "assets/img/aluf.webp", icon: "medal", kind: "print" },
    // רקע אולפן שמוקרן מאחורי שני התלמידים שמשדרים את הפודקאסט
    { id: "podcast", title: "פרשה פודקאסט", tagline: "ראיון בשידור חי + דף המאזינים",
      color: "#7b4fc4", soft: "#e6dcf7", char: "assets/img/podcast.webp", icon: "headphones", kind: "print", studio: "assets/img/studio.jpg" },
    { id: "ted", title: "טדברו בבית", tagline: "פעילות ודף סיכום לשולחן השבת",
      color: "#f07c12", soft: "#fde3c8", char: "assets/img/ted.webp", icon: "mic", kind: "print" }
  ],

  materials: {
    "nitzavim--vayeilech": {
      pgisha: { pages: ["pgisha-1.webp", "pgisha-2.webp"], pdf: "pgisha.pdf" },
      play: {
        pages: ["play-1.webp"], pdf: "play.pdf",
        game: {
          intro: "מסמנים בכיתה שני צדדים: נכון ← → לא נכון. המורה מקריאה 10 משפטים על הפרשה.",
          instruction: "כולם עוברים לצד המתאים.",
          items: [
            { q: "משה עומד להיכנס לארץ ישראל.", a: false, note: "לא נכון." },
            { q: "יהושע עומד להנהיג את העם.", a: true, note: "נכון." },
            { q: "בפרשה משה אומר לעם \"חזק ואמץ\".", a: null, note: "" },
            { q: "\"ובחרת בחיים\" מופיע בפרשה.", a: true, note: "נכון." },
            { q: "רק מנהיגי העם ניצבים לפני משה.", a: false, note: "לא נכון - כולכם." },
            { q: "בפרשה משה בן 80.", a: false, note: "לא נכון 120." },
            { q: "יהושע הוא זה שמדבר עם כל העם במקום משה.", a: false, note: "לא נכון." },
            { q: "משה כתב את התורה ומסר אותה לכהנים ולזקני ישראל.", a: true, note: "נכון." },
            { q: "פעם בשבע שנים, בחג הסוכות, קוראים את התורה לפני העם.", a: true, note: "נכון." },
            { q: "במעמד הקהל צריכים להגיע רק הגברים.", a: false, note: "לא נכון - האנשים, הנשים והטף." }
          ]
        }
      },
      // video: קישור יוטיוב / וימאו / mp4. כשריק — מוצגת שקופית הסרטון (poster).
      live: { video: "", poster: "live-1.webp", pages: ["ikvot-1.webp"], pagesTitle: "דף עבודה: בעקבות הפרשה", pdf: "ikvot.pdf" },
      aluf: { tagline: "תפזורת \"ובחרת בחיים\" עם מסר סודי", pages: ["aluf-1.webp"], pdf: "aluf.pdf" },
      podcast: { tagline: "ראיון עם משה רבנו + דף המאזינים", pages: ["podcast-1.webp", "podcast-2.webp"], pdf: "podcast.pdf" },
      ted: { tagline: "גלגל \"ובחרת בחיים\" ודף סיכום לשולחן השבת", pages: ["ted-1.webp", "ted-2.webp", "ted-3.webp"], pdf: "ted.pdf" }
    }
  }
};
