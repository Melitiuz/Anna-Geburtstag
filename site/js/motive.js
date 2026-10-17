// Die vier Figuren mit ihren Varianten und das 2 x 2 Feld, in das sie gelegt werden.
// Alles als SVG, keine Bilddateien nötig.
(function () {
  var ZAHLWORT = ["", "eine", "zwei", "drei", "vier"];

  function svg(inhalt) {
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + inhalt + "</svg>";
  }
  var BODEN = '<ellipse cx="50" cy="95" rx="34" ry="3.5" fill="rgba(0,0,0,.15)"/>';

  // Ritter auf Pferd, Blickrichtung rechts. "links" wird gespiegelt.
  var RITTER =
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
    '<path d="M48 13 C46 4 56 2 60 8 C56 7 53 9 52 13 Z" fill="#e8466e"/>';

  function ritter(richtung) {
    var spiegel = richtung === "links" ? ' transform="translate(100 0) scale(-1 1)"' : "";
    return svg(BODEN + "<g" + spiegel + ">" + RITTER + "</g>");
  }

  // Baum mit verschiedenen Früchten
  var FRUCHT_PLAETZE = [[38, 34], [60, 26], [64, 50], [30, 54], [50, 48]];
  var FRUECHTE = {
    aepfel: function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#e23b3b"/><path d="M' + x + " " + (y - 4) + " l1.5 -2.5" + '" stroke="#5a3b1d" stroke-width="1.2"/>'; },
    birnen: function (x, y) { return '<path d="M' + x + " " + (y - 5) + " C" + (x + 2) + " " + (y - 3) + " " + (x + 4.5) + " " + (y + 2) + " " + x + " " + (y + 4.5) + " C" + (x - 4.5) + " " + (y + 2) + " " + (x - 2) + " " + (y - 3) + " " + x + " " + (y - 5) + ' Z" fill="#d6d23a" stroke="#a9a020" stroke-width=".8"/>'; },
    kirschen: function (x, y) { return '<path d="M' + (x - 2.5) + " " + (y + 2) + " Q" + x + " " + (y - 6) + " " + (x + 1) + " " + (y - 6) + " Q" + (x + 2) + " " + (y - 3) + " " + (x + 3) + " " + (y + 2) + '" stroke="#3b5d1d" stroke-width="1" fill="none"/><circle cx="' + (x - 2.5) + '" cy="' + (y + 3) + '" r="2.6" fill="#b3112e"/><circle cx="' + (x + 3) + '" cy="' + (y + 3) + '" r="2.6" fill="#b3112e"/>'; },
    pflaumen: function (x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="3.2" ry="4.3" fill="#6b3fa0"/><path d="M' + x + " " + (y - 3.5) + " v6" + '" stroke="#4e2c78" stroke-width=".8"/>'; }
  };

  function baum(frucht) {
    var f = FRUECHTE[frucht];
    return svg(
      '<ellipse cx="50" cy="95" rx="26" ry="3.5" fill="rgba(0,0,0,.15)"/>' +
      '<path d="M44 94 L46 56 H54 L56 94 Z" fill="#7a4b2e"/><path d="M50 70 L40 58 M50 64 L60 54" stroke="#7a4b2e" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="31" cy="48" r="17" fill="#3f9e4d"/><circle cx="69" cy="48" r="17" fill="#3f9e4d"/>' +
      '<circle cx="50" cy="38" r="24" fill="#4fb85c"/><circle cx="50" cy="20" r="15" fill="#5cc76a"/>' +
      (f ? FRUCHT_PLAETZE.map(function (p) { return f(p[0], p[1]); }).join("") : "")
    );
  }

  // Prinzessin mit 1 bis 4 Edelsteinen in der Krone
  function prinzessin(steine) {
    var farben = ["#e8466e", "#3fb5e8", "#2fae6b", "#7c5cff"];
    var s = "";
    for (var i = 0; i < steine; i++) {
      var x = steine === 1 ? 50 : 38.5 + (23 * i) / (steine - 1);
      s += '<circle cx="' + x + '" cy="14" r="3" fill="' + farben[i] + '" stroke="#fff" stroke-width=".7"/>';
    }
    return svg(
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
      '<path d="M34 19 L34 3 L42 9 L50 0 L58 9 L66 3 L66 19 Z" fill="#f6c544" stroke="#d99a1e" stroke-width="1"/>' +
      s
    );
  }

  // Burg mit 0 bis 4 gehissten Flaggen
  var FLAGGEN = [
    '<line x1="20" y1="10" x2="20" y2="1" stroke="#555" stroke-width="1.5"/><path d="M20 1 L28 3.5 L20 6 Z" fill="#e8466e"/>',
    '<line x1="80" y1="10" x2="80" y2="1" stroke="#555" stroke-width="1.5"/><path d="M80 1 L88 3.5 L80 6 Z" fill="#f59e2c"/>',
    '<line x1="38" y1="40" x2="38" y2="27" stroke="#555" stroke-width="1.5"/><path d="M38 27 L46 29.5 L38 32 Z" fill="#2fae6b"/>',
    '<line x1="62" y1="40" x2="62" y2="27" stroke="#555" stroke-width="1.5"/><path d="M62 27 L70 29.5 L62 32 Z" fill="#7c5cff"/>'
  ];

  function burg(flaggen) {
    return svg(
      '<ellipse cx="50" cy="95" rx="40" ry="3.5" fill="rgba(0,0,0,.15)"/>' +
      FLAGGEN.slice(0, flaggen).join("") +
      '<rect x="22" y="46" width="56" height="48" fill="#b3b6c2"/>' +
      '<path d="M22 46 h6 v-6 h7 v6 h6 v-6 h7 v6 h6 v-6 h7 v6 h6 v-6 h5 v6" fill="#b3b6c2"/>' +
      '<rect x="10" y="30" width="20" height="64" fill="#a2a5b2"/><rect x="70" y="30" width="20" height="64" fill="#a2a5b2"/>' +
      '<path d="M8 31 L20 10 L32 31 Z" fill="#5b6bd6"/><path d="M68 31 L80 10 L92 31 Z" fill="#5b6bd6"/>' +
      '<path d="M40 94 V76 Q50 64 60 76 V94 Z" fill="#6a3f25"/><path d="M50 69 V94" stroke="#4a2e1d" stroke-width="1.5"/>' +
      '<rect x="17" y="44" width="6" height="10" rx="3" fill="#2b1d2e"/><rect x="77" y="44" width="6" height="10" rx="3" fill="#2b1d2e"/>' +
      '<rect x="47" y="52" width="6" height="9" rx="3" fill="#2b1d2e"/>' +
      '<path d="M24 66 h8 M60 60 h10 M30 80 h6 M66 84 h8" stroke="#9497a5" stroke-width="1.5"/>'
    );
  }

  // varianten: was durch Antippen durchgeschaltet wird
  // standard: Variante für Gewinnfenster und Labyrinth
  var MOTIVE = {
    ritter: {
      name: "Ritter auf Pferd",
      wer: "Der Ritter",
      varianten: ["rechts", "links"],
      zeichnen: ritter,
      standard: "rechts",
      hinweis: function (v) { return "Er reitet nach " + v + "."; }
    },
    baum: {
      name: "Baum",
      wer: "Der Baum",
      varianten: ["aepfel", "birnen", "kirschen", "pflaumen"],
      zeichnen: baum,
      standard: "",
      hinweis: function (v) {
        return { aepfel: "An ihm hängen Äpfel.", birnen: "An ihm hängen Birnen.", kirschen: "An ihm hängen Kirschen.", pflaumen: "An ihm hängen Pflaumen." }[v];
      }
    },
    prinzessin: {
      name: "Prinzessin mit Krone",
      wer: "Die Prinzessin",
      varianten: [1, 2, 3, 4],
      zeichnen: prinzessin,
      standard: 0,
      hinweis: function (v) {
        return v === 1 ? "In ihrer Krone funkelt ein Edelstein." : "In ihrer Krone funkeln " + ZAHLWORT[v] + " Edelsteine.";
      }
    },
    burg: {
      name: "Burg",
      wer: "Die Burg",
      varianten: [1, 2, 3, 4],
      zeichnen: burg,
      standard: 2,
      hinweis: function (v) {
        return v === 1 ? "Auf ihr weht eine Flagge." : "Auf ihr wehen " + ZAHLWORT[v] + " Flaggen.";
      }
    }
  };
  Object.keys(MOTIVE).forEach(function (id) {
    var m = MOTIVE[id];
    m.svg = m.zeichnen(m.standard);
  });

  // Die vier Felder im 2 x 2 Raster, in Lesereihenfolge
  var FELDER = ["oben-links", "oben-rechts", "unten-links", "unten-rechts"];
  var FELD_TEXT = { "oben-links": "oben links", "oben-rechts": "oben rechts", "unten-links": "unten links", "unten-rechts": "unten rechts" };

  function eintrag(id) {
    var l = (window.GEBURTSTAG && window.GEBURTSTAG.loesung) || {};
    return l[id] || {};
  }

  // Richtige Variante aus config.js, bei ungültiger Angabe die erste
  function loesung(id) {
    var v = MOTIVE[id].varianten, w = eintrag(id).variante;
    return v.indexOf(w) >= 0 ? w : v[0];
  }

  // Richtiger Platz aus config.js, bei ungültiger Angabe nach Reihenfolge der Figuren
  function platz(id) {
    var p = eintrag(id).platz;
    return FELDER.indexOf(p) >= 0 ? p : FELDER[Object.keys(MOTIVE).indexOf(id)];
  }

  window.Motive = {
    MOTIVE: MOTIVE,
    FELDER: FELDER,
    loesung: loesung,
    platz: platz,
    hinweis: function (id) {
      return MOTIVE[id].wer + " steht " + FELD_TEXT[platz(id)] + ". " + MOTIVE[id].hinweis(loesung(id));
    }
  };
})();
