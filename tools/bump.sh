#!/bin/sh
# מעדכן את מספר הגרסה בקישורים לקבצים, כדי שהדפדפן יטען את הגרסה החדשה מיד אחרי העלאה
cd "$(dirname "$0")/.." && V=$(date +%Y%m%d%H%M) && sed -i -E "s#(assets/(style.css|data.js|app.js|parashot.js))(\?v=[0-9]+)?\"#\1?v=$V\"#g" *.html && echo "גרסה $V"
