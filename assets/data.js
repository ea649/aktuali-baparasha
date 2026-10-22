/*
  ===== אקטואלי בפרשה — ששת הנושאים הקבועים =====
  הקובץ הזה לא משתנה משבוע לשבוע.
  החומרים של כל פרשה יושבים בתיקייה משלה: assets/p/<מזהה הפרשה>/
  ובתוכה קובץ materials.json שמתאר אותם (ראו README ואת קובץ ההוראות לצ'אט).
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
  ]
};
