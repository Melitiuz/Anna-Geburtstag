// Die vier Motive und das Bild, auf das sie gezogen werden. Alles als SVG, keine Bilddateien nötig.
(function () {
  var MOTIVE = {
    ritter: {
      name: "Ritter auf Pferd",
      svg:
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="50" cy="95" rx="34" ry="3.5" fill="rgba(0,0,0,.15)"/>' +
        '<path d="M24 56 C14 60 12 72 16 80" stroke="#4a2e1d" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<rect x="28" y="64" width="6" height="28" rx="2" fill="#7a4b2e"/><rect x="38" y="66" width="6" height="26" rx="2" fill="#6a3f25"/>' +
        '<rect x="58" y="66" width="6" height="26" rx="2" fill="#6a3f25"/><rect x="67" y="64" width="6" height="28" rx="2" fill="#7a4b2e"/>' +
        '<rect x="27" y="89" width="8" height="4" rx="1" fill="#2b1d1d"/><rect x="37" y="89" width="8" height="4" rx="1" fill="#2b1d1d"/>' +
        '<rect x="57" y="89" width="8" height="4" rx="1" fill="#2b1d1d"/><rect x="66" y="89" width="8" height="4" rx="1" fill="#2b1d1d"/>' +
        '<ellipse cx="50" cy="60" rx="27" ry="13" fill="#8a5a3b"/>' +
        '<path d="M68 56 L79 34 L89 37 L80 62 Z" fill="#8a5a3b"/>' +
        '<ellipse cx="87" cy="41" rx="10" ry="6" transform="rotate(28 87 41)" fill="#8a5a3b"/>' +
        '<path d="M79 31 L82 25 L84 32 Z" fill="#6a3f25"/>' +
        '<path d="M70 52 L78 33 L81 34 L74 54 Z" fill="#4a2e1d"/>' +
        '<circle cx="88" cy="38" r="1.3" fill="#1b1b1b"/>' +
        '<path d="M38 48 H64 V60 Q51 64 38 60 Z" fill="#d23a4f"/><path d="M38 58 Q51 62 64 58" stroke="#f6c544" stroke-width="2" fill="none"/>' +
        '<rect x="47" y="48" width="7" height="16" rx="2" fill="#8d98a5"/>' +
        '<rect x="42" y="28" width="15" height="23" rx="4" fill="#c3ccd6"/>' +
        '<path d="M33 34 H46 V46 Q39.5 55 33 46 Z" fill="#3c5bd8"/><path d="M39.5 35 V51 M34 41 H45" stroke="#f6c544" stroke-width="2.4"/>' +
        '<line x1="55" y1="40" x2="97" y2="10" stroke="#7a4b2e" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M95 8 L99 6 L97 12 Z" fill="#9aa5b1"/>' +
        '<circle cx="50" cy="21" r="8.5" fill="#9aa5b1"/><rect x="45" y="19" width="11" height="2.5" rx="1" fill="#2b1d2e"/>' +
        '<path d="M48 13 C46 4 56 2 60 8 C56 7 53 9 52 13 Z" fill="#e8466e"/>' +
        "</svg>"
    },
    baum: {
      name: "Baum",
      svg:
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="50" cy="95" rx="26" ry="3.5" fill="rgba(0,0,0,.15)"/>' +
        '<path d="M44 94 L46 56 H54 L56 94 Z" fill="#7a4b2e"/><path d="M50 70 L40 58 M50 64 L60 54" stroke="#7a4b2e" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="31" cy="48" r="17" fill="#3f9e4d"/><circle cx="69" cy="48" r="17" fill="#3f9e4d"/>' +
        '<circle cx="50" cy="38" r="24" fill="#4fb85c"/><circle cx="50" cy="20" r="15" fill="#5cc76a"/>' +
        '<circle cx="38" cy="36" r="3" fill="#e8466e"/><circle cx="60" cy="28" r="3" fill="#e8466e"/><circle cx="64" cy="50" r="3" fill="#e8466e"/><circle cx="30" cy="54" r="3" fill="#e8466e"/>' +
        "</svg>"
    },
    prinzessin: {
      name: "Prinzessin mit Krone",
      svg:
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="50" cy="95" rx="26" ry="3.5" fill="rgba(0,0,0,.15)"/>' +
        '<path d="M37 30 C33 50 34 60 30 66 H70 C66 60 67 50 63 30 Z" fill="#f2c14e"/>' +
        '<path d="M50 42 L22 94 H78 Z" fill="#f08bb4"/><path d="M28 86 H72" stroke="#fff" stroke-width="2" opacity=".7"/>' +
        '<path d="M42 42 H58 L56 58 H44 Z" fill="#e05a96"/>' +
        '<path d="M43 46 L33 62 M57 46 L67 62" stroke="#f6d0b1" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="47" y="36" width="6" height="7" fill="#f6d0b1"/>' +
        '<circle cx="50" cy="28" r="11" fill="#f6d0b1"/>' +
        '<path d="M39 27 C39 15 61 15 61 27 C57 21 45 21 39 27 Z" fill="#f2c14e"/>' +
        '<circle cx="46" cy="28" r="1.3" fill="#2b1d2e"/><circle cx="54" cy="28" r="1.3" fill="#2b1d2e"/>' +
        '<path d="M46 32 Q50 35 54 32" stroke="#c0392b" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M40 17 L40 6 L45 11 L50 3 L55 11 L60 6 L60 17 Z" fill="#f6c544" stroke="#d99a1e" stroke-width="1"/>' +
        '<circle cx="50" cy="11" r="1.8" fill="#e8466e"/>' +
        "</svg>"
    },
    burg: {
      name: "Burg",
      svg:
        '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
        '<ellipse cx="50" cy="95" rx="40" ry="3.5" fill="rgba(0,0,0,.15)"/>' +
        '<rect x="22" y="46" width="56" height="48" fill="#b3b6c2"/>' +
        '<path d="M22 46 h6 v-6 h7 v6 h6 v-6 h7 v6 h6 v-6 h7 v6 h6 v-6 h5 v6" fill="#b3b6c2"/>' +
        '<rect x="10" y="30" width="20" height="64" fill="#a2a5b2"/><rect x="70" y="30" width="20" height="64" fill="#a2a5b2"/>' +
        '<path d="M8 31 L20 10 L32 31 Z" fill="#5b6bd6"/><path d="M68 31 L80 10 L92 31 Z" fill="#5b6bd6"/>' +
        '<line x1="20" y1="10" x2="20" y2="1" stroke="#555" stroke-width="1.5"/><path d="M20 1 L28 3.5 L20 6 Z" fill="#e8466e"/>' +
        '<line x1="80" y1="10" x2="80" y2="1" stroke="#555" stroke-width="1.5"/><path d="M80 1 L88 3.5 L80 6 Z" fill="#f59e2c"/>' +
        '<path d="M40 94 V76 Q50 64 60 76 V94 Z" fill="#6a3f25"/><path d="M50 69 V94" stroke="#4a2e1d" stroke-width="1.5"/>' +
        '<rect x="17" y="44" width="6" height="10" rx="3" fill="#2b1d2e"/><rect x="77" y="44" width="6" height="10" rx="3" fill="#2b1d2e"/>' +
        '<rect x="47" y="52" width="6" height="9" rx="3" fill="#2b1d2e"/>' +
        '<path d="M24 66 h8 M60 60 h10 M30 80 h6 M66 84 h8" stroke="#9497a5" stroke-width="1.5"/>' +
        "</svg>"
    }
  };

  // Hintergrundbild, Koordinaten in einem 400 x 300 Raster
  var SZENE =
    '<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">' +
    '<defs><linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fd3ff"/><stop offset="1" stop-color="#d9f1ff"/></linearGradient></defs>' +
    '<rect width="400" height="300" fill="url(#himmel)"/>' +
    '<circle cx="345" cy="45" r="24" fill="#ffe27a"/>' +
    '<g fill="#fff" opacity=".9"><ellipse cx="80" cy="40" rx="30" ry="11"/><ellipse cx="102" cy="34" rx="20" ry="11"/><ellipse cx="210" cy="60" rx="26" ry="9"/><ellipse cx="228" cy="54" rx="16" ry="9"/></g>' +
    '<path d="M0 170 Q90 120 190 160 T400 140 V300 H0 Z" fill="#8fd47a"/>' +
    '<path d="M200 190 Q290 120 400 150 V300 H200 Z" fill="#7cc566"/>' +
    '<path d="M0 220 Q120 190 240 225 T400 230 V300 H0 Z" fill="#6bb957"/>' +
    '<path d="M0 290 Q90 255 170 250 Q230 246 260 215 L275 215 Q250 260 180 272 Q100 285 60 300 H0 Z" fill="#e8d3a2"/>' +
    '<g fill="#fff"><circle cx="330" cy="260" r="3"/><circle cx="360" cy="275" r="3"/><circle cx="300" cy="285" r="3"/><circle cx="30" cy="235" r="3"/></g>' +
    '<g fill="#f59e2c"><circle cx="330" cy="260" r="1.3"/><circle cx="360" cy="275" r="1.3"/><circle cx="300" cy="285" r="1.3"/><circle cx="30" cy="235" r="1.3"/></g>' +
    "</svg>";

  // Zielplätze im Bild: Mittelpunkt (x, y) und Größe s im 400 x 300 Raster
  var PLAETZE = [
    { motiv: "burg", x: 300, y: 118, s: 130 },
    { motiv: "baum", x: 72, y: 122, s: 105 },
    { motiv: "prinzessin", x: 203, y: 172, s: 80 },
    { motiv: "ritter", x: 108, y: 232, s: 108 }
  ];

  window.Motive = { MOTIVE: MOTIVE, SZENE: SZENE, PLAETZE: PLAETZE };
})();
