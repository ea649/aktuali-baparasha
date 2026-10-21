/*
  ===== אקטואלי בפרשה — קובץ התוכן השבועי =====
  כל שבוע מעדכנים רק את הקובץ הזה ואת הקבצים בתיקייה assets/m
  (תמונות העמודים בפורמט webp וקובצי ה-PDF, באותם שמות).
*/
window.SITE = {
  parasha: "ניצבים-וילך",

  topics: [
    {
      id: "pgisha",
      title: "פגישה עם הפרשה",
      tagline: "מצגת פתיחה שמכירה לתלמידים את הפרשה",
      color: "#ee2f62",
      soft: "#fcd7e1",
      char: "assets/img/pgisha.webp",
      icon: "heart",
      kind: "slides",
      pages: ["assets/m/pgisha-1.webp", "assets/m/pgisha-2.webp"],
      pdf: "assets/m/pgisha.pdf"
    },
    {
      id: "play",
      title: "פרשה PLAY",
      tagline: "משחק נכון / לא נכון — כל הכיתה בתנועה",
      color: "#f5a400",
      soft: "#ffeec2",
      char: "assets/img/play.webp",
      icon: "dice",
      kind: "slides",
      pages: ["assets/m/play-1.webp"],
      pdf: "assets/m/play.pdf",
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
    {
      id: "live",
      title: "פרשה LIVE",
      tagline: "צופים בסרטון — ואז בודקים כמה טוב הקשבנו",
      color: "#14a9c4",
      soft: "#cdeef4",
      char: "assets/img/live.webp",
      icon: "clapper",
      kind: "video",
      // קישור לסרטון: יוטיוב / וימאו / קובץ mp4. כשריק — מוצגת שקופית הסרטון מקנבה.
      video: "",
      poster: "assets/m/live-1.webp",
      pages: ["assets/m/ikvot-1.webp"],
      pagesTitle: "דף עבודה: בעקבות הפרשה",
      pdf: "assets/m/ikvot.pdf"
    },
    {
      id: "aluf",
      title: "אלוף הפרשה",
      tagline: "תפזורת \"ובחרת בחיים\" עם מסר סודי",
      color: "#aa479a",
      soft: "#f3d9ee",
      char: "assets/img/aluf.webp",
      icon: "medal",
      kind: "print",
      pages: ["assets/m/aluf-1.webp"],
      pdf: "assets/m/aluf.pdf"
    },
    {
      id: "podcast",
      title: "פרשה פודקאסט",
      tagline: "ראיון עם משה רבנו + דף המאזינים",
      color: "#7b4fc4",
      soft: "#e6dcf7",
      char: "assets/img/podcast.webp",
      icon: "headphones",
      kind: "print",
      pages: ["assets/m/podcast-1.webp", "assets/m/podcast-2.webp"],
      pdf: "assets/m/podcast.pdf",
      // רקע אולפן שמוקרן מאחורי שני התלמידים שמשדרים את הפודקאסט
      studio: "assets/img/studio.jpg"
    },
    {
      id: "ted",
      title: "טדברו בבית",
      tagline: "גלגל \"ובחרת בחיים\" ודף סיכום לשולחן השבת",
      color: "#f07c12",
      soft: "#fde3c8",
      char: "assets/img/ted.webp",
      icon: "mic",
      kind: "print",
      pages: ["assets/m/ted-1.webp", "assets/m/ted-2.webp", "assets/m/ted-3.webp"],
      pdf: "assets/m/ted.pdf"
    }
  ]
};
