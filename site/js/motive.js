// Die vier Figuren mit ihren Varianten und das 2 x 2 Feld, in das sie gelegt werden.
// Alles als SVG, keine Bilddateien nötig. Gezeichnet mit matten, natürlichen Farben und Materialien
// (Stein, Holz, Laub, Stoff, Fell) und organischen, unregelmäßigen Formen; Licht weich von links oben.
(function () {

  function svg(inhalt) {
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' + inhalt + "</svg>";
  }
  function stops(farben) {
    return farben.map(function (f, i) { return '<stop offset="' + (i / (farben.length - 1)).toFixed(2) + '" stop-color="' + f + '"/>'; }).join("");
  }
  // Rundung: Licht von links oben
  function kugel(id, farben) { return '<radialGradient id="' + id + '" cx=".38" cy=".32" r=".8">' + stops(farben) + "</radialGradient>"; }
  // Zylinder (Beine, Türme, Stamm): hell links, dunkel rechts
  function zylinder(id, farben) { return '<linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="0">' + stops(farben) + "</linearGradient>"; }
  function senkrecht(id, farben) { return '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' + stops(farben) + "</linearGradient>"; }
  var WEICH = '<filter id="weich" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="1.4"/></filter>';
  function bodenschatten(rx) { return '<ellipse cx="50" cy="95" rx="' + rx + '" ry="3.4" fill="rgba(0,0,0,.25)" filter="url(#weich)"/>'; }
  // Fester Zufall je Zahl, damit Steine und Blätter unregelmäßig, aber bei jedem Aufruf gleich aussehen
  function rausch(n) { var s = Math.sin(n * 91.7 + 13.3) * 43758.5453; return s - Math.floor(s); }
  // Buschige Form: Bögen rund um eine Ellipse, jeder leicht anders groß
  function busch(cx, cy, rx, ry, boegen, saat) {
    var d = "", w0 = rausch(saat) * 0.5;
    for (var i = 0; i <= boegen; i++) {
      var w = w0 + (i / boegen) * Math.PI * 2, x = cx + Math.cos(w) * rx, y = cy + Math.sin(w) * ry;
      if (i === 0) { d += "M" + x.toFixed(1) + " " + y.toFixed(1); continue; }
      var wm = w - Math.PI / boegen, aus = 1.2 + rausch(saat + i) * 0.14;
      d += " Q" + (cx + Math.cos(wm) * rx * aus).toFixed(1) + " " + (cy + Math.sin(wm) * ry * aus).toFixed(1) + " " + x.toFixed(1) + " " + y.toFixed(1);
    }
    return d + " Z";
  }

  // Ritter auf Pferd, Blickrichtung rechts. "links" wird gespiegelt.
  // Die Beine (rect mit y = 64, 66 oder 89) entfernt der Brückenritt und zeichnet sie selbst animiert.
  var RITTER_DEFS = "<defs>" + WEICH +
    kugel("ri-fell", ["#b07a4c", "#8f5b33", "#6b3f20"]) + zylinder("ri-bein", ["#a06c42", "#835229", "#5e3a1c"]) +
    zylinder("ri-bein-hinten", ["#7d4f2b", "#673f20", "#4a2c15"]) + senkrecht("ri-maehne", ["#3d2617", "#2a1a10"]) +
    zylinder("ri-metall", ["#8d959f", "#c4cad1", "#b3bac2", "#7c848e"]) + kugel("ri-helm", ["#cdd2d8", "#a7aeb7", "#737b85"]) +
    kugel("ri-schild", ["#4a74c4", "#2f559f", "#223f78"]) + kugel("ri-decke", ["#c9454f", "#a8303b", "#7c1f28"]) +
    zylinder("ri-gold", ["#c99a3c", "#e2bd62", "#a8792a"]) + "</defs>";
  var PFERD = "M24 54 C30 48 52 50 64 48 C70 42 74 34 80 30 C84 28 88 30 90 33 L96 43 C97 46 95 49 92 49 " +
    "C89 49 87 47.5 85 47.5 C82 49.5 79 52 77 56 C76 62 74 66 70 69 C62 73 40 74 30 70 C22 67 20 59 24 54 Z";
  var RITTER =
    // Schweif
    '<path d="M25 55 C14 55 9 67 12 83 C15 78 15 72 19 67 C17 75 18 79 21 82 C20 72 21 63 25 58 Z" fill="url(#ri-maehne)"/>' +
    '<rect x="38" y="66" width="7" height="26" rx="3" fill="url(#ri-bein-hinten)"/><rect x="57" y="66" width="7" height="26" rx="3" fill="url(#ri-bein-hinten)"/>' +
    '<rect x="28" y="64" width="7" height="28" rx="3" fill="url(#ri-bein)"/><rect x="66" y="64" width="7" height="28" rx="3" fill="url(#ri-bein)"/>' +
    '<rect x="37" y="89" width="9" height="5" rx="2" fill="#2f2622"/><rect x="56" y="89" width="9" height="5" rx="2" fill="#2f2622"/>' +
    '<rect x="27" y="89" width="9" height="5" rx="2" fill="#3a2f2a"/><rect x="65" y="89" width="9" height="5" rx="2" fill="#3a2f2a"/>' +
    '<path d="' + PFERD + '" fill="url(#ri-fell)"/>' +
    '<path d="M32 68 C45 72 60 71 69 67" stroke="#5a341a" stroke-width="2.2" fill="none" opacity=".35" stroke-linecap="round"/>' +
    '<path d="M86 37 C89 41 92 44 95.5 45.5 C95 48 93.5 49 91.5 48.8 C89 48.6 87 47.6 85.5 47.4 C85 44 85 40 86 37 Z" fill="#c49a73" opacity=".8"/>' +
    '<ellipse cx="94.4" cy="45.4" rx=".9" ry=".6" fill="#3a2214"/>' +
    // Zunge: normalerweise unsichtbar, beim Apfel-Füttern über CSS (.futter-ziel .zunge) sichtbar
    '<path class="zunge" opacity="0" d="M89.5 46.5 Q95 47.5 95.5 53 Q95 56.5 91.8 55 Q90.6 51 88.6 48 Z" fill="#e2657f"/>' +
    '<path d="M79 31 C79 27 80.5 24 82.5 22.5 C83.5 25.5 84 28.5 83 31.5 Z" fill="#8f5b33"/>' +
    // Mähne als wellige Strähnen
    '<path d="M63 48 C66 44 69 40 72 36 C74 33 77 30 80 29 C80.5 32 78 34 77 36.5 C78.5 36.5 77.5 39 76 40.5 C77 41.5 75.5 43.5 73.5 45 C74 47 71 48.5 68.5 49.5 C67 49.7 65 49.5 63 48 Z" fill="url(#ri-maehne)"/>' +
    // Auge
    '<ellipse cx="87.2" cy="36.6" rx="2" ry="2.3" fill="#24150c"/><circle cx="86.6" cy="35.9" r=".55" fill="#f2ece4" opacity=".8"/>' +
    '<path d="M84.6 34.3 Q87.2 33 89.6 34.6" stroke="#4a2c16" stroke-width=".8" fill="none" stroke-linecap="round"/>' +
    // Zaumzeug und Zügel
    '<path d="M86 31 L92.5 44.5 M85 41 L92 41.5" stroke="#4a2a14" stroke-width="1" fill="none" stroke-linecap="round"/>' +
    '<path d="M91.5 46.5 Q75 47 57 43" stroke="#4a2a14" stroke-width="1" fill="none" stroke-linecap="round"/>' +
    // Satteldecke
    '<path d="M37 50 Q51 47 65 49 V61 Q51 65.5 37 61 Z" fill="url(#ri-decke)"/>' +
    '<path d="M38 58.4 Q51 62.6 64 58.4" stroke="url(#ri-gold)" stroke-width="2" fill="none"/>' +
    // Ritter
    '<rect x="46.5" y="48" width="8" height="17" rx="3" fill="url(#ri-metall)"/>' +
    '<path d="M41 33 C41 28.5 43.5 27 49.5 27 C55.5 27 58 28.5 58 33 L57.2 49 C55 51.5 44 51.5 41.8 49 Z" fill="url(#ri-metall)"/>' +
    '<path d="M42 39 Q49.5 41 57.4 39 M42.2 44.5 Q49.5 46.5 57.2 44.5" stroke="#6c747e" stroke-width=".8" fill="none"/>' +
    '<path d="M31.5 33 H47 V45.5 Q39.3 57 31.5 45.5 Z" fill="url(#ri-schild)" stroke="url(#ri-gold)" stroke-width="1.3"/>' +
    '<path d="M39.3 35.8 V50 M34.4 41.3 H44.3" stroke="url(#ri-gold)" stroke-width="2.4" stroke-linecap="round"/>' +
    '<line x1="56" y1="40" x2="96" y2="11" stroke="#7a4f2c" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M94 8.5 L99 5.5 L97 12 Z" fill="#9aa1aa"/>' +
    '<path d="M40.5 21 C40.5 14 44.5 10 50 10 C55.5 10 59.5 14 59.5 21 C59.5 26 56 29.5 50 29.5 C44 29.5 40.5 26 40.5 21 Z" fill="url(#ri-helm)"/>' +
    '<path d="M43.5 18.2 H56.5 V21 H43.5 Z" fill="#1f242b"/><path d="M45 23.5 V26.5 M47.5 23.5 V27 M50 23.5 V27.3 M52.5 23.5 V27 M55 23.5 V26.5" stroke="#5f6770" stroke-width=".7"/>' +
    // Feder
    '<path d="M48.5 11 C46 6 47.5 1.5 53 1 C57.5 0.8 61 3.5 61.5 7.5 C59 5.5 56.5 5.5 54.5 7 C56 7.5 57 8.5 57.3 10 C55 8.8 53 9.2 51.8 11.2 Z" fill="#c74a63"/>' +
    '<path d="M50 10.5 C51 6 54.5 3.2 59.5 4.6" stroke="#8f2f45" stroke-width=".6" fill="none"/>';

  function ritter(richtung) {
    var spiegel = richtung === "links" ? ' transform="translate(100 0) scale(-1 1)"' : "";
    return svg(RITTER_DEFS + '<ellipse cx="50" cy="95" rx="34" ry="3.4" fill="rgba(0,0,0,.25)" filter="url(#weich)"/>' + "<g" + spiegel + ">" + RITTER + "</g>");
  }

  // Baum mit verschiedenen Früchten in unterschiedlicher Anzahl. Ohne Sorte (Gewinnfenster): ohne Früchte.
  var FRUCHT_PLAETZE = [[50, 42], [34, 32], [64, 30], [36, 56], [64, 52]];
  var FRUECHTE = {
    orangen: { anzahl: 1, name: "eine Orange", zeichnen: function (x, y) {
      return '<circle cx="' + x + '" cy="' + y + '" r="5.4" fill="url(#ba-orange)"/>' +
        '<circle cx="' + (x + 0.4) + '" cy="' + (y - 4.9) + '" r=".8" fill="#6b4a1e"/>' +
        '<path d="M' + (x + 0.6) + " " + (y - 5.2) + " q3 -2.2 5.2 -.6 q-2.6 1.6 -5.2 .6 Z" + '" fill="#4f8a35"/>'; } },
    kirschen: { anzahl: 2, name: "zwei Kirschpaare", zeichnen: function (x, y) {
      return '<path d="M' + (x - 2.5) + " " + (y + 1.5) + " Q" + (x - 0.5) + " " + (y - 5) + " " + (x + 1) + " " + (y - 6.2) + " Q" + (x + 2) + " " + (y - 3) + " " + (x + 3) + " " + (y + 1.5) + '" stroke="#5a6b2a" stroke-width="1" fill="none"/>' +
        '<path d="M' + (x + 1) + " " + (y - 6.2) + " q2.6 -1.4 4.4 .2 q-2.4 1.2 -4.4 -.2 Z" + '" fill="#4f8a35"/>' +
        '<circle cx="' + (x - 2.5) + '" cy="' + (y + 3.3) + '" r="3" fill="url(#ba-kirsche)"/><circle cx="' + (x + 3) + '" cy="' + (y + 3.3) + '" r="3" fill="url(#ba-kirsche)"/>'; } },
    aepfel: { anzahl: 3, name: "drei Äpfel", zeichnen: function (x, y) {
      return '<path d="M' + x + " " + (y - 3.6) + " C" + (x + 3) + " " + (y - 5.6) + " " + (x + 5.6) + " " + (y - 2.6) + " " + (x + 4.8) + " " + (y + 1) +
        " C" + (x + 4.2) + " " + (y + 4.6) + " " + (x + 1.6) + " " + (y + 5.2) + " " + x + " " + (y + 4.4) + " C" + (x - 1.6) + " " + (y + 5.2) + " " + (x - 4.2) + " " + (y + 4.6) + " " + (x - 4.8) + " " + (y + 1) +
        " C" + (x - 5.6) + " " + (y - 2.6) + " " + (x - 3) + " " + (y - 5.6) + " " + x + " " + (y - 3.6) + ' Z" fill="url(#ba-apfel)"/>' +
        '<path d="M' + x + " " + (y - 3.4) + " l.8 -2.6" + '" stroke="#5a3a1a" stroke-width="1.1" stroke-linecap="round"/>'; } }
  };

  function baum(sorte) {
    var f = FRUECHTE[sorte];
    return svg(
      "<defs>" + WEICH + zylinder("ba-stamm", ["#8a5f3e", "#6e4a2f", "#4e331f"]) +
      kugel("ba-hinten", ["#5c9a3e", "#3f7a2c", "#2c5a20"]) + kugel("ba-laub", ["#86c25a", "#5ea040", "#3d7a2c"]) +
      kugel("ba-hell", ["#a3d36f", "#79b450"]) +
      kugel("ba-orange", ["#f7b765", "#e9862a", "#b85f17"]) + kugel("ba-kirsche", ["#d94a58", "#b01f33", "#6e1020"]) +
      kugel("ba-apfel", ["#d6e88a", "#a8c94f", "#73932c"]) + "</defs>" +
      bodenschatten(26) +
      // Stamm mit Wurzelansatz und Ästen
      '<path d="M40 94 C44 92 45 86 45.5 76 C46 68 44 61 40 56 L44 55 C46.5 58 48 60 49 62 C49.5 58 49.5 55 50.5 52 L53.5 52.5 C53 56 53 59 53.5 62 C55 58.5 57.5 56 60 54 L62.5 56 C58.5 60 55.5 66 55 74 C54.5 84 56 91 60.5 94 Z" fill="url(#ba-stamm)"/>' +
      '<path d="M47 90 C47.5 82 47.5 74 48 66 M51.5 91 C51 84 51.5 76 52.5 68 M44.5 93 C45.5 91 46 88 46 86" stroke="#3e2816" stroke-width=".8" fill="none" opacity=".55" stroke-linecap="round"/>' +
      // Krone aus mehreren buschigen Lagen
      '<path d="' + busch(50, 42, 35, 21, 13, 3) + '" fill="url(#ba-hinten)"/>' +
      '<path d="' + busch(49, 35, 31, 22, 12, 7) + '" fill="url(#ba-laub)"/>' +
      '<path d="' + busch(43, 24, 14, 9, 8, 11) + '" fill="url(#ba-hell)" opacity=".85"/>' +
      '<path d="' + busch(30, 38, 9, 6.5, 7, 17) + '" fill="url(#ba-hell)" opacity=".6"/>' +
      '<path d="' + busch(60, 31, 9, 6, 7, 23) + '" fill="url(#ba-hell)" opacity=".55"/>' +
      // Blattstruktur
      [[42, 46], [56, 44], [33, 50], [68, 47], [47, 30], [62, 39], [38, 36], [54, 22]].map(function (p, i) {
        return '<path d="M' + p[0] + " " + p[1] + " q2.5 -" + (2 + rausch(i) * 1.5).toFixed(1) + " 5 0" + '" stroke="#2f5f22" stroke-width=".8" fill="none" opacity=".45" stroke-linecap="round"/>';
      }).join("") +
      (f ? FRUCHT_PLAETZE.slice(0, f.anzahl).map(function (p) { return f.zeichnen(p[0], p[1]); }).join("") : "")
    );
  }

  // Prinzessin: In der Krone sitzen je nach Sorte unterschiedlich viele Edelsteine, das Kleid hat dieselbe Farbe.
  // Ohne Sorte (Gewinnfenster): keine Steine, helles Kleid.
  var EDELSTEINE = {
    rubin: { farben: ["#e8697a", "#c11f3a", "#7a0f22"], anzahl: 1, name: "ein Rubin",
      kleid: ["#e58a8f", "#c94e57", "#9a2f39"], mieder: ["#d4626b", "#b23d47", "#7c2029"], falte: "#7c2029" },
    saphir: { farben: ["#7da0e8", "#2c5bc4", "#173679"], anzahl: 3, name: "drei Saphire",
      kleid: ["#97b4e6", "#5f86cc", "#3d5fa3"], mieder: ["#7196da", "#4a6cb5", "#2d4a86"], falte: "#2d4a86" },
    smaragd: { farben: ["#6fd49a", "#1f9a58", "#0e5a33"], anzahl: 5, name: "fünf Smaragde",
      kleid: ["#93d4a8", "#56a977", "#337d52"], mieder: ["#68be89", "#3e9463", "#256840"], falte: "#256840" }
  };
  var KLEID_NEUTRAL = { kleid: ["#efe9df", "#d8d0c4", "#b9afa1"], mieder: ["#ded7cb", "#c5bbac", "#9d9384"], falte: "#9d9384" };
  function prinzessin(sorte) {
    var st = EDELSTEINE[sorte], s = "", defs = "", stoff = st || KLEID_NEUTRAL, k = sorte || "neutral";
    if (st) {
      defs = kugel("pr-stein-" + sorte, st.farben);
      // Steine sitzen in der Krone, die auf dem Kopf getragen wird
      // Der mittlere Stein ist der größte, nach außen werden sie kleiner
      var n = st.anzahl, mitte = (n - 1) / 2, bMitte = n > 3 ? 2.6 : 3, schritt = n > 3 ? 0.55 : 0.8, breite = n > 3 ? 19 : 14;
      for (var i = 0; i < n; i++) {
        var x = n === 1 ? 50 : 50 - breite / 2 + (breite * i) / (n - 1), y = 14.6, b = bMitte - Math.abs(i - mitte) * schritt;
        s += '<path d="M' + x + " " + (y - b * 1.1) + " L" + (x + b) + " " + (y - b * 0.25) + " L" + x + " " + (y + b * 1.1) + " L" + (x - b) + " " + (y - b * 0.25) +
          ' Z" fill="url(#pr-stein-' + sorte + ')"/>' +
          '<path d="M' + (x - b) + " " + (y - b * 0.25) + " L" + x + " " + (y - b * 1.1) + " L" + x + " " + (y - b * 0.25) + ' Z" fill="#fff" opacity=".25"/>';
      }
    }
    return svg(
      "<defs>" + WEICH + senkrecht("pr-kleid-" + k, stoff.kleid) +
      '<linearGradient id="pr-falten" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/>' +
      '<stop offset=".25" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#000" stop-opacity=".08"/>' +
      '<stop offset=".75" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>' +
      kugel("pr-mieder-" + k, stoff.mieder) +
      kugel("pr-haar", ["#f2d27a", "#ddb04e", "#b8862e"]) + kugel("pr-haut", ["#fbe3cf", "#f2c9a8", "#dba583"]) +
      zylinder("pr-arm", ["#f6d7bd", "#eec09e", "#d49f7e"]) + zylinder("pr-krone", ["#a8792a", "#e2bd62", "#f1d58a", "#d5a645", "#946414"]) +
      defs + "</defs>" +
      bodenschatten(26) +
      // Haare hinten, fließend und leicht gewellt
      '<path d="M37.5 24 C33 33 35 44 32 53 C30 59 27 63 28.5 67 C31 66 32 63.5 34 64.5 C35.5 62 37 62.5 38.5 60 L61.5 60 C63 62.5 64.5 62 66 64.5 C68 63.5 69 66 71.5 67 C73 63 70 59 68 53 C65 44 67 33 62.5 24 Z" fill="url(#pr-haar)"/>' +
      '<path d="M36.5 34 C35.5 44 34 54 30.5 63 M63.5 34 C64.5 44 66 54 69.5 63" stroke="#a87a2a" stroke-width=".8" fill="none" opacity=".6"/>' +
      // Kleid mit welligem Saum
      '<path d="M43 47 C38 62 30 78 21.5 90 C25 92.5 28 90 31.5 92.5 C35 90.5 38 93.5 42 92 C45.5 94 48 92 50.5 93.5 C53 92 55.5 94 59 92 C62.5 93.5 65.5 90.5 69 92.5 C72.5 90 75.5 92.5 78.5 90 C70 78 62 62 57 47 Z" fill="url(#pr-kleid-' + k + ')"/>' +
      '<path d="M43 47 C38 62 30 78 21.5 90 C25 92.5 28 90 31.5 92.5 C35 90.5 38 93.5 42 92 C45.5 94 48 92 50.5 93.5 C53 92 55.5 94 59 92 C62.5 93.5 65.5 90.5 69 92.5 C72.5 90 75.5 92.5 78.5 90 C70 78 62 62 57 47 Z" fill="url(#pr-falten)"/>' +
      '<path d="M44 62 C40 72 36 82 33 91 M50 62 C49.5 72 49.5 82 50 92.5 M56 62 C60 72 64 82 67 91" stroke="' + stoff.falte + '" stroke-width=".8" fill="none" opacity=".45" stroke-linecap="round"/>' +
      // Arme und Puffärmel
      '<path d="M43 47 C40 52 36 57 33.5 62 M57 47 C60 52 64 57 66.5 62" stroke="url(#pr-arm)" stroke-width="4.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M41 43 H59 L57.5 60 C53 62 47 62 42.5 60 Z" fill="url(#pr-mieder-' + k + ')"/>' +
      '<path d="M42.5 60 C47 62 53 62 57.5 60" stroke="#e2bd62" stroke-width="1.2" fill="none"/>' +
      '<path d="M36.8 46 C36.8 42.5 39 40.5 41.8 40.8 C44.2 41.2 45.5 43.5 45 46.2 C44.3 49 41.5 50.2 39.3 49.2 C37.6 48.5 36.8 47.4 36.8 46 Z" fill="url(#pr-mieder-' + k + ')"/>' +
      '<path d="M63.2 46 C63.2 42.5 61 40.5 58.2 40.8 C55.8 41.2 54.5 43.5 55 46.2 C55.7 49 58.5 50.2 60.7 49.2 C62.4 48.5 63.2 47.4 63.2 46 Z" fill="url(#pr-mieder-' + k + ')"/>' +
      '<path d="M46.8 37 H53.2 V43.5 C51.5 44.3 48.5 44.3 46.8 43.5 Z" fill="#e8b693"/>' +
      // Kopf
      '<path d="M38.2 28 C38.2 20.5 43.5 16.5 50 16.5 C56.5 16.5 61.8 20.5 61.8 28.5 C61.8 35.5 56.5 40.8 50 40.8 C43.5 40.8 38.2 35.5 38.2 28 Z" fill="url(#pr-haut)"/>' +
      // Pony mit Strähnen
      '<path d="M37.8 30 C37 19 44 14.5 50.5 15 C57 15.3 63 19.5 62.2 30 C60.5 26 58 23 54.5 22 C55 24 54 25.5 52.5 26 C51.5 23.5 49 22 46 22.5 C45.5 24.5 43.5 26.5 41 27 C40.5 28 39.2 29 37.8 30 Z" fill="url(#pr-haar)"/>' +
      '<path d="M44 18 C46 20 47.5 22 47 24.5 M55 18.5 C55 20.5 55.5 22 56.5 23.5" stroke="#a87a2a" stroke-width=".7" fill="none" opacity=".6"/>' +
      // Gesicht
      '<ellipse cx="43.6" cy="33.5" rx="2.4" ry="1.6" fill="#e88c8c" opacity=".35" filter="url(#weich)"/><ellipse cx="56.4" cy="33.5" rx="2.4" ry="1.6" fill="#e88c8c" opacity=".35" filter="url(#weich)"/>' +
      '<ellipse cx="45.6" cy="29.8" rx="1.5" ry="1.9" fill="#3b2a22"/><ellipse cx="54.4" cy="29.8" rx="1.5" ry="1.9" fill="#3b2a22"/>' +
      '<circle cx="45.2" cy="29.2" r=".45" fill="#fff" opacity=".85"/><circle cx="54" cy="29.2" r=".45" fill="#fff" opacity=".85"/>' +
      '<path d="M43.3 27.2 Q45.6 26 47.8 27 M52.2 27 Q54.4 26 56.7 27.2" stroke="#7a5230" stroke-width=".8" fill="none" stroke-linecap="round"/>' +
      '<path d="M49.6 31.5 Q50.2 33 49.4 33.6" stroke="#cf9a7a" stroke-width=".7" fill="none" stroke-linecap="round"/>' +
      '<path d="M47.3 35.6 Q50 37.4 52.7 35.6" stroke="#b5485c" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
      // Krone, auf dem Kopf getragen (leicht gerundeter Reif)
      '<ellipse cx="50" cy="20.6" rx="11" ry="1.6" fill="#5a3a10" opacity=".35" filter="url(#weich)"/>' +
      '<path d="M39 20 L38.5 8.5 L44.2 12.5 L50 5.5 L55.8 12.5 L61.5 8.5 L61 20 Q50 22.4 39 20 Z" fill="url(#pr-krone)"/>' +
      '<path d="M39 17.6 Q50 19.8 61 17.6 L61 20 Q50 22.4 39 20 Z" fill="#946414" opacity=".5"/>' +
      '<circle cx="38.5" cy="8.3" r="1.1" fill="#e2bd62"/><circle cx="50" cy="5.2" r="1.2" fill="#e2bd62"/><circle cx="61.5" cy="8.3" r="1.1" fill="#e2bd62"/>' +
      s
    );
  }

  // Burg mit drei gleichen Fahnen. Jede Fahne zeigt ein Bild und nutzt genau ihre drei Farben
  // (wichtig fürs Rätsel), dazu nur Weiß und Schwarz für Kleinigkeiten. Ohne Sorte (Gewinnfenster): helle Fahnen.
  // Muster in Fahnen-Koordinaten (14 x 10, rechts mit Kerbe), werden auf die Fahnenform zugeschnitten.
  var ROT = "#d23b3b", GRUEN = "#3a9a46", GRUEN_DUNKEL = "#2b7a35", BLAU = "#3567c9", ORANGE = "#e98a2a";
  var BLAU_DUNKEL = "#24489a";
  // Drache nach dem Drachen-Emoji aus Google Noto Emoji (Apache-Lizenz 2.0), umgefärbt: blauer Körper, Bauch, Mähne, Hörner und Schwanzspitze grün; Koordinaten 128 x 128
  var DRACHE = '<path style="fill:#4fb85a;" d="M103.13,54.42c0,0,3.5-0.66,6.57-2.96c2.75-2.06,6.77-5.88,5.4-7.32c-1.48-1.55-3.87,2.53-4.43,1.55 c-0.37-0.65,2.32-2.89,3.52-6.34c1.07-3.07-0.15-6.11-2.89-2.75c-0.85,1.04-1.49,2.17-1.9,1.76c-0.44-0.44,0.61-3,1.38-5.39 c1.29-4.04-0.68-6.72-4.05-1.83c-1.44,2.08-2.09,4.82-3.17,4.62c-0.77-0.14-0.38-1.7-0.51-3.25c-0.27-3.23-3.36-2.87-4.42,2.83 c-0.47,2.52-0.06,5.43-0.63,5.63c-0.99,0.35-0.77-3.94-2.39-3.52c-1.18,0.31-1.62,3.24-1.55,6.34s2.04,8.09,2.04,8.09l2.75,5 L103.13,54.42z"/> <path style="fill:#2f8f3c;" d="M95.46,52.19c0,0-2.21,5.16,0.82,11.8c2.21,4.85,5.37,8.27,3.5,10.21 c-2.77,2.86-12.53-3.33-22.15-0.49C70.14,75.92,66.57,80.18,64.39,88c-1.63,5.85-3.24,8.12-5.96,8.92c-2.12,0.62-5.44,0.16-7.2-1.45 c-3.72-3.42-3.63-7.37-2.23-10.69c1.31-3.11,5.64-6.15,7.65-7.19c5.56-2.89,19.22-7.11,23.09-14.5c3.45-6.59,4.36-14.15,2.25-19.08 c-2.11-4.93-5.49-3.17-5.49-3.17l0.77,11.68L63.83,66.6L44.47,79.83L41.8,93.91l6.76,11.4l13.94-1.06l14.22-21.4l13.73-0.99 l13.02-0.7l4.93-13.8L95.46,52.19z"/> <path style="fill:#3567c9;" d="M105.59,40.13c-2.32-1.57-10.23,5.63-10.3,13.73c-0.07,8.09,4.81,13.8,5.8,15.42s4.11,7.3,0.07,9.85 c-3.24,2.06-18.37-4.58-26.19,0.42c-7.81,5-5.16,13.59-12.34,20.53c-2.69,2.61-17.15,5.02-18.35-9.34s16.19-15.06,24.78-21.33 c8.59-6.26,11.33-11.54,11.05-18.93c-0.28-7.39-2.46-9.71-2.46-9.71l-13.8,5.63l-6.34,10.28c0,0-8.27,3.03-15.58,7.95 c-8.61,5.8-10.14,10-10.14,10s-2.02-0.63-2.02-1.13s7.09-8.57,6.48-12.11c-0.75-4.34-3.14-5.51-4.55-5.65 c-1.41-0.14-2.21,1.08-1.17,2.67c1.03,1.6,1.55,3,1.36,3.61c-0.19,0.61-0.81,1.25-0.94,0.19c-0.14-1.17-0.99-3.17-1.6-3.99 c-0.5-0.67-2.06-2.63-3.99-2.3s-2.06,2.16-0.47,3.66c1.6,1.5,3.14,3.61,2.35,4.55c-0.8,0.94-2.11-2.09-2.96-3.21 c-0.84-1.13-2.93-1.56-4.18-1.81c-1.31-0.26-3.47,1.19-2.21,3.28c0.94,1.55,2.21,0.8,3.75,2.44s1.6,2.25,1.55,2.67 c-0.05,0.42-2.96,2.58-3.28,4.55c-0.33,1.97,0.23,3.19-0.52,3.89c-0.75,0.7-3.94,0.56-4.97,0.89c-1.03,0.33-2.16,2.96-0.19,3.8 c1.97,0.84,5.58,0.99,7.27,0.47c1.23-0.38,1.6-0.94,2.11-0.84c0.52,0.09,4.6,3.1,4.6,3.1s-0.58,4.34-0.49,8.02 c0.12,4.79,1.55,8.54,1.55,8.54s1.43,2.04,0.82,2.02c-1.74-0.07-6.48-4.79-8.82-5.3c-2.35-0.52-4.22-0.37-5.12,0.66 c-0.82,0.94-1.12,3.01,0.52,3.14c1.79,0.14,2.63-0.23,2.63,0.42c0,0.43-0.58,0.78-1.74,1.17c-1.67,0.56-2.14,1.89-1.74,3.52 c0.38,1.53,2.49,1.08,3.1,0.61s0.84-0.94,1.17-0.52c0.33,0.42-1.11,1.5-1.55,2.49c-0.89,1.99,0.36,2.85,1.69,2.96 c1.83,0.14,2.11-2.21,2.96-3.1c0.84-0.89,1.92-1.6,2.3-1.55c0.38,0.05,0.23,1.55,1.92,3.38c1.69,1.83,3.99,0.8,4.36,1.13 s-0.28,2.77,1.17,4.08c1.45,1.31,3.8,0.75,3.8-1.27s0.19-2.86,0.19-2.86s2.84,2.49,6.55,3.8c3.71,1.31,8.78,2.42,8.78,2.42 s-0.51,0.91-0.4,2.7c0.05,0.73,0.21,2.96,2.37,2.91c1.55-0.03,1.62-3,2.18-3.1c0.56-0.09-0.54,3.87,2.32,4.06 c2.86,0.19,1.95-3.54,2.46-3.64c0.52-0.09,0.53,4.84,4.27,3.14c1.97-0.89-0.66-5.24-0.47-5.63c0.12-0.23,1.97-0.52,3.19-1.31 c0.81-0.53,1.31-1.69,1.31-1.69s5.91-1.67,8.35-6.08c3.33-6.02,2.77-13.16,5.4-15.46c2.63-2.3,7.7-0.47,10.14-0.19 c2.44,0.28,2.67,0.19,2.82,0.28c0.14,0.09,0.42,1.22,0.19,1.55c-0.23,0.33-6.9,2.72-8.49,5.4c-1.6,2.67-1.37,4.58-1.22,5.3 c0.33,1.55,1.85,1.76,2.53,0.47c0.67-1.27,1.03-2.39,1.6-2.21c0.56,0.19-0.54,2.29-0.09,3.28c0.66,1.45,2.3,1.22,2.96,0.7 c0.66-0.52,0.82-2.58,1.29-2.35c0.47,0.23,0,1.13,0.87,2.65c0.77,1.35,3.31,0.12,2.93-1.88c-0.23-1.22-1.24-2.14,0.21-3.31 s2.63-1.13,4.13-2.06c1.5-0.94,1.36-2.3,3.05-1.69c1.69,0.61,1.74,2.14,3,1.27c1.9-1.31,0.99-3.94-0.61-5.21 c-1.6-1.27-3.94-1.41-4.27-1.55c-0.33-0.14-0.47-1.92-0.47-1.92s9.48-3.71,10.56-13.05c1.08-9.34-9.67-19.43-10.37-25.48 C103.32,47.01,107.62,41.5,105.59,40.13z"/> <path style="fill:#74d47e;" d="M40.64,113.46c1.28,0.69,2.64,1.29,3.97,1.73c3.82,1.26,7.7,1.97,7.7,1.97s0.8-1.64,3.47-2.86 c1.51-0.69,4.79-1.22,4.79-1.22s-4.83-0.14-9.71-0.94c-2.1-0.34-4.73-1.24-7.12-2.82L40.64,113.46z"/> <path style="fill:#74d47e;" d="M51.75,66.25c3.05-1.62,5.98-3,8.26-3.99l-2.72-5.43c-2.17,0.75-5,1.91-8.44,3.71L51.75,66.25z"/> <path style="fill:#74d47e;" d="M36.34,80.43c1.34-2.89,3.25-5.47,5.41-7.57l-3.76-5.36c-3.48,2.91-5.93,6.02-7.56,9.32L36.34,80.43z "/> <path style="fill:#74d47e;" d="M29.75,78.3c-1.68,4.04-2.17,7.32-2.08,12.2l6.66-0.38c-0.14-2.87,0.39-5.64,1.37-8.21L29.75,78.3z" /> <path style="fill:#74d47e;" d="M32.26,105.7c1.19,1.64,2.55,3.12,4,4.61c0.77,0.79,1.79,1.59,2.95,2.32l3.24-4.23 c-0.83-0.66-1.6-1.41-2.3-2.26c-0.96-1.17-1.9-2.41-2.75-3.9L32.26,105.7z"/> <path style="fill:#74d47e;" d="M31.38,104.41c-1.97-3.11-3.34-6.88-3.65-12.36l6.69-0.61c0.33,4.15,1.19,7.13,2.32,9.5L31.38,104.41 z"/> <path style="fill:#74d47e;" d="M42.91,71.8c0.93-0.8,1.9-1.52,2.88-2.13c1.49-0.93,3.03-1.83,4.57-2.67l-2.82-5.76 c-1.48,0.81-3.32,1.83-5.01,2.89c-1.33,0.84-2.53,1.69-3.42,2.47L42.91,71.8z"/> <path style="fill:#74d47e;" d="M61.24,61.73c0.46-0.19,0.88-0.36,1.25-0.51c3.38-1.31,4.41-3.33,3.75-4.88 c-0.66-1.55-3.24-1.17-3.85-0.94c-0.25,0.09-1.54,0.29-3.79,0.99L61.24,61.73z"/> <path style="fill:none;stroke:#24489a;stroke-miterlimit:10;" d="M76.38,50.34"/> <path style="fill:none;stroke:#24489a;stroke-miterlimit:10;" d="M69.55,52.52"/> <linearGradient id="drache-a" gradientUnits="userSpaceOnUse" x1="88.6417" y1="32.7507" x2="46.9709" y2="33.8769"> <stop offset="0" style="stop-color:#8be08f"/> <stop offset="0.396" style="stop-color:#43b04f"/> <stop offset="1" style="stop-color:#1f6e2c"/> </linearGradient> <path style="fill:url(#drache-a);" d="M34.43,24.11c0,0-0.42-5.3,3.14-8.12c3.57-2.82,9.2-0.94,12.29-0.38s7.13,0.47,10.04-0.19 c2.91-0.66,4.04-1.22,5.82-1.31s4.36-0.28,6.62-0.47c1.91-0.16,5.73-0.66,6.34,1.13c0.46,1.33-0.84,2.67-2.91,3.19 c-2.06,0.52-2.67,0.75-2.25,1.69s3.85,0.33,4.6,0.09c0.75-0.23,5.12-1.13,5.12,1.41s-3.57,3.28-5.87,3.85 c-2.3,0.56-3.7,0.23-3.61,1.41c0.14,1.88,6.01,0.09,7.79-0.14c1.78-0.23,4.04-0.56,4.27,1.13s-1.55,3.52-4.93,4.08 c-3.38,0.56-5.58,1.13-5.54,2.02s4.2-0.02,5.4-0.23c1.55-0.28,3.75-0.32,3.99,1.27c0.56,3.75-6.1,3.1-6.24,4.6 c-0.13,1.34,5.3-0.09,5.96,2.11c0.66,2.21-1.41,4.13-4.69,4.41c-2.28,0.2-10.09-1.36-11.31-0.05s2.96,1.61,4.36,1.92 c1.88,0.42,5.02,0.66,3.61,3.52c-0.92,1.88-4.36,1.36-6.87,1.48s-6.97,0.4-6.97,0.4l-10.04,0.47l-8.4-0.99l-5.3-1.97l-4.04-1.69 l-1.27-1.36l11.68-14.41L34.43,24.11z"/> <path style="fill:#4fb85a;" d="M66.88,50.8c0,3.25-2.22,6.86-6.83,6.9c-4.61,0.04-6.97-2.78-7.71-2.99s-0.99,2.67-3.55,2.82 c-2.57,0.14-6.37-3.2-6.86-3.31c-0.49-0.11-0.63,2.53-3.41,2.53c-1.94,0-4.19-3.03-5.67-4.4s-4.12-3.38-4.12-3.38h7.46 c0,0,2.5-0.28,5.63,0c3.04,0.27,5.53,2.67,10.56,2.57c2.82-0.06,4.15-0.32,4.15-0.32s1.02-3.68,5.67-3.91 C66.53,47.1,66.88,50.06,66.88,50.8z"/> <path style="fill:#a6e8ab;" d="M51.49,20.75c0,0,4.86-1.85,5.47-3.17c0.61-1.31,2.53-6.24,5.02-7.13c2.49-0.89,3.94,1.6,2.21,3.52 s-4.27,3.52-2.86,4.41s4.5-3.47,5.3-4.5s2.63-3.71,4.69-3.66c2.06,0.05,3.34,3.58-0.61,6.85c-4.08,3.38-6.1,4.18-10.79,4.5 c-4.69,0.33-6.95,0.63-6.95,0.63L51.49,20.75z"/> <path style="fill:#74d47e;" d="M27.48,20.96c0,0-2.35-7.79,1.78-11.17s9.53-1.27,12.81,0.75c3.01,1.85,8.9,1.54,8.68-1.88 c-0.19-2.96-3.44-2.13-3.71-0.8c-0.23,1.17-0.73,1.92-1.17,1.78c-0.5-0.15-0.81-1.16-0.75-1.78c0.23-2.67,2.49-3.47,4.27-3.28 c1.4,0.15,3.75,1.17,3.52,4.93s-4.15,4.81-7.93,4.18c-2.99-0.5-5.68-2.58-8.39-3.31c-1.66-0.44-4-0.08-5.43,0.96 c-1.67,1.22-2.11,3.15-2.1,4.74c0.01,1.01,0.2,1.94,0.29,2.63c0.21,1.57,1.97,6.34,1.97,6.34L27.48,20.96z"/> <path style="fill:#74d47e;" d="M54.61,26.5c0,0,2.39,0.52,2.49,3.28s-0.33,3-0.09,3.1s2.16-1.03,3.19,0.28 c1.3,1.66-1.03,4.36-2.35,5.26c-1.31,0.89-2.11,1.03-2.3,1.45c-0.19,0.42-1.96,5.87-4.36,6.85c-2.77,1.13-10.75,0.66-11.83,0.66 c-1.08,0-2.16,1.06-3.17,1.58s-1.99,0.86-3.17,0.57c-1.17-0.28-2.96-1.6-2.96-1.6L54.61,26.5z"/> <path style="fill:#D43330;" d="M38.61,38.79l2.86,0.14l1.45-5.12c0,0-3.99-1.36-5.4-1.08s-4.46,1.45-5.44,1.97 c-0.99,0.52-1.78,1.83-3.66,1.55c-1.88-0.28-5.91-1.03-8.31,1.69c-2.07,2.36-1.69,4.36,0.09,5.21c1.78,0.84,4.04-1.83,5.49-2.06 c1.45-0.23,3.66,0.8,3.66,0.8L38.61,38.79z"/> <path style="fill:#FFFFFF;" d="M28.05,32.88c0,0,0.89,4.08,1.97,4.08c1.08,0,1.08-1.31,1.08-1.31s4.13-1.08,4.93-1.55 c0.8-0.47,1.78-2.39,1.78-2.39l-7.32-0.52L28.05,32.88z"/> <path style="fill:#FFFFFF;" d="M27.95,44c0,0-0.84-1.83-0.52-2.63c0.33-0.8,0.61-2.25,1.55-2.16c1.03,0.1,1.17,1.69,1.17,1.69 s2.72-2.49,4.83-3.33c1.13-0.45,3.05-0.61,3.19,0.28c0.14,0.89-0.52,3.43-0.52,3.43L27.95,44z"/> <path style="fill:#3567c9;" d="M24.86,40.62c-0.35,0.64-0.66,3-0.09,4.69c0.56,1.69,2.44,4.32,5.35,4.5s8.31-6.01,8.63-6.19 c0.33-0.19,9.48,1.03,12.06-2.63c2.58-3.66,1.23-10.1,2.53-12.11c1.41-2.16,3.47-0.75,3.47-0.75s-0.23-1.5-1.27-2.53 c-1.03-1.03-2.49-0.84-2.06-2.06c0.42-1.22,3.61-0.09,3.8-0.99c0.19-0.89-1.09-1.79-2.55-2.06c-0.69-0.13-2.43,0.19-2.52-0.23 c-0.09-0.42,1.36-0.47,1.41-1.45c0.05-0.99-3.71-0.61-5.26-0.42c-1.55,0.19-3.57,1.08-3.71,0.7c-0.14-0.38,2.53-1.78,2.44-2.25 s-2.21-0.89-5.35,0.8c-3.14,1.69-7.23,5.82-7.23,5.82l-3.1-0.23c0,0-4.32-5.11-7.09-4.46c-2.92,0.69-3.89,3.52-3.85,7.51 s1.74,6.19,6.05,6.99c2.44,0.45,8.78-0.22,10.09-0.28c3.43-0.16,4.08,1.36,4.27,2.67s-2.35,2.77-3.57,3.05s-2.86,0.56-4.18,1.45 c-1.31,0.89-2.82,3.38-3.71,3.33c-0.89-0.05-1.08-1.6-1.55-2.53C27.44,40.01,25.7,39.08,24.86,40.62z"/> <path style="fill:#74d47e;" d="M48.61,23.45c-0.04,0.39-1.09,3.94-3.8,5.49c-2.71,1.55-5.46,1.09-6.19-1.16 c-0.82-2.51,0.56-5.1,3.84-4.65C45.42,23.55,48.82,21.58,48.61,23.45z"/> <ellipse transform="matrix(0.6249 -0.7807 0.7807 0.6249 -4.858 42.3191)" style="fill:#2F2E2F;" cx="41.61" cy="26.21" rx="2.24" ry="1.94"/> <path style="fill:#2F2E2F;" d="M24.74,21.69c-0.62,0.56,0.42,1.98,0.49,2.79s-0.31,2.28,0.75,2.21c1.06-0.07,1.38-1.31,1.16-2.75 C26.84,22,25.83,20.7,24.74,21.69z"/>';
  // Wellenband von y bis y + 2.2 über die ganze Fahne
  function welle(y, farbe) {
    return '<path d="M0 ' + y + " Q1.75 " + (y - 0.9) + " 3.5 " + y + " T7 " + y + " T10.5 " + y + " T14 " + y + " V" + (y + 2.4) + ' H0 Z" fill="' + farbe + '"/>';
  }
  var FAHNEN = {
    // Grüne Wiese mit einer Blume aus roten und orangen Blütenblättern
    "rot-gruen-orange": { name: "grün, orange und rot", muster:
      '<rect x="0" y="0" width="14" height="10" fill="' + GRUEN + '"/>' +
      '<path d="M.8 9.6 l.4 -1.4 l.4 1.4 M2.4 4 l.35 -1.2 l.35 1.2 M11.2 2.6 l.35 -1.2 l.35 1.2 M11.6 8.8 l.4 -1.4 l.4 1.4 M3.6 7.6 l.35 -1.2 l.35 1.2" stroke="' + GRUEN_DUNKEL + '" stroke-width=".35" fill="none"/>' +
      '<path d="M6.8 9.8 C6.9 8 7 6.6 7 5.4" stroke="' + GRUEN_DUNKEL + '" stroke-width=".55" fill="none" stroke-linecap="round"/>' +
      '<path d="M6.9 8.2 C5.6 8.3 4.6 7.6 4.3 6.6 C5.5 6.6 6.5 7.2 6.9 8.2 Z M7 7.4 C8.1 7.2 9.1 7.6 9.6 8.4 C8.5 8.6 7.5 8.2 7 7.4 Z" fill="' + GRUEN_DUNKEL + '"/>' +
      [0, 1, 2, 3, 4, 5, 6, 7].map(function (k) {
        var w = k * 45;
        return '<ellipse cx="7" cy="2.5" rx=".75" ry="1.55" transform="rotate(' + w + ' 7 4.1)" fill="' + (k % 2 ? ORANGE : ROT) + '"/>';
      }).join("") +
      '<circle cx="7" cy="4.1" r=".9" fill="' + ORANGE + '"/><circle cx="7" cy="4.1" r=".45" fill="' + ROT + '"/>' },
    // Blaue und grüne Wellen mit oranger, untergehender Sonne in der Mitte
    "blau-gruen-orange": { name: "blau, grün und orange", muster:
      '<rect x="0" y="0" width="14" height="10" fill="' + BLAU + '"/>' + welle(1.2, GRUEN) + welle(3.2, BLAU_DUNKEL) +
      '<circle cx="7" cy="5.9" r="2.4" fill="' + ORANGE + '"/>' +
      welle(5.9, GRUEN) + welle(7.6, BLAU) + welle(9.2, GRUEN) +
      '<path d="M5.4 6.9 H8.6 M5.9 7.5 H8.1" stroke="' + ORANGE + '" stroke-width=".35" stroke-linecap="round" opacity=".8"/>' },
    // Roter Hintergrund mit blauem Drachen (grüner Bauch und Mähne)
    "rot-blau-gruen": { name: "rot, blau und grün", muster:
      '<rect x="0" y="0" width="14" height="10" fill="' + ROT + '"/>' +
      '<svg x="1.2" y=".2" width="9.6" height="9.6" viewBox="0 0 128 128">' + DRACHE + "</svg>" }
  };
  // Fahnen auf den Spitzen der Seitentürme und auf dem Mittelturm
  var FAHNEN_ORTE = [[20, 1.5, 14], [80, 1.5, 14], [50, 8.5, 24]]; // Mast x, Fahne oben, Mast unten
  function zinnen(x1, x2, y, breite, luecke, farbe) {
    var s = "";
    for (var x = x1; x + breite <= x2 + 0.01; x += breite + luecke) s += '<rect x="' + x + '" y="' + y + '" width="' + breite + '" height="5" rx=".4" fill="' + farbe + '"/>';
    return s;
  }
  function fenster(x, y, b, h) {
    return '<path d="M' + x + " " + (y + h) + " V" + (y + b / 2) + " A" + (b / 2) + " " + (b / 2) + " 0 0 1 " + (x + b) + " " + (y + b / 2) + " V" + (y + h) + ' Z" fill="#2a2622"/>' +
      '<path d="M' + (x - 0.8) + " " + (y + h + 0.8) + " H" + (x + b + 0.8) + '" stroke="#a49a8c" stroke-width="1.2"/>';
  }
  // Mauerwerk aus unregelmäßigen Steinen in leicht wechselnden Grautönen
  function steine(x1, x2, y1, y2, saat) {
    var s = "", reihe = 0;
    for (var y = y1; y < y2 - 0.5; y += 5.5, reihe++) {
      var x = x1 - (reihe % 2 ? 3.5 : 0);
      while (x < x2) {
        var b = 6 + rausch(saat + reihe * 17 + x) * 4, l = Math.max(x, x1), r = Math.min(x + b, x2);
        if (r - l > 1) {
          var t = Math.round(rausch(saat + reihe * 31 + x * 3) * 14) - 7;
          s += '<rect x="' + (l + 0.35).toFixed(1) + '" y="' + (y + 0.35).toFixed(1) + '" width="' + (r - l - 0.7).toFixed(1) + '" height="' + (Math.min(5.5, y2 - y) - 0.7).toFixed(1) +
            '" rx=".8" fill="rgb(' + (200 + t) + "," + (194 + t) + "," + (184 + t) + ')" opacity=".55"/>';
        }
        x += b;
      }
    }
    return s;
  }
  // Burg im Stil des Burg-Emojis: grauer Stein, hoher Mittelturm mit Zinnen,
  // zwei Seitentürme mit roten Spitzdächern, Holztor
  // ohneFahnen: Burg ganz ohne Fahnen und Masten (für das Ritter-Labyrinth)
  function burg(sorte, ohneFahnen) {
    var f = FAHNEN[sorte];
    var fahnen = FAHNEN_ORTE.map(function (o) {
      return '<line x1="' + o[0] + '" y1="' + o[2] + '" x2="' + o[0] + '" y2="' + o[1] + '" stroke="#6f6a64" stroke-width="1.3" stroke-linecap="round"/>' +
        '<g transform="translate(' + o[0] + " " + o[1] + ') scale(1.35)">' +
        // leicht wehende Fahne
        '<g transform="skewY(4)"><g clip-path="url(#bu-fahnenform)">' + (f ? f.muster : '<rect width="14" height="10" fill="#ece8e0"/>') + "</g>" +
        '<path d="M0 0 H14 L12 5 L14 10 H0 Z" fill="url(#bu-falten)"/></g></g>';
    }).join("");
    return svg(
      "<defs>" + WEICH + '<clipPath id="bu-fahnenform"><path d="M0 0 H14 L12 5 L14 10 H0 Z"/></clipPath>' +
      zylinder("bu-turm", ["#9d978e", "#cfc9bf", "#d9d3c9", "#b8b1a6", "#8a847b"]) +
      zylinder("bu-wand", ["#b7b0a5", "#d4cec4", "#dcd6cc", "#c3bcb1", "#a19a8f"]) +
      zylinder("bu-dach", ["#c25a4e", "#a8433a", "#8a3029", "#5e1d18"]) +
      zylinder("bu-tor", ["#5e3a1e", "#86572f", "#946238", "#74491f", "#4c2d14"]) +
      '<linearGradient id="bu-falten" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="#000" stop-opacity=".12"/><stop offset=".3" stop-color="#fff" stop-opacity=".18"/>' +
      '<stop offset=".55" stop-color="#000" stop-opacity=".1"/><stop offset=".8" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>' +
      "</defs>" +
      bodenschatten(38) +
      // Mittelturm (hinten)
      '<rect x="39" y="28" width="22" height="44" fill="url(#bu-turm)"/>' + steine(39, 61, 28, 52, 5) +
      zinnen(39, 61, 23, 4, 2, "#c8c1b6") + '<rect x="39" y="27.5" width="22" height="1.4" fill="#7d776e" opacity=".6"/>' +
      fenster(46.5, 33, 7, 10) +
      // Hauptmauer mit Zinnen
      '<rect x="18" y="52" width="64" height="40" fill="url(#bu-wand)"/>' + steine(18, 82, 52, 92, 9) +
      zinnen(18, 82, 47, 5, 2.8, "#cbc4b9") + '<rect x="18" y="51.6" width="64" height="1.6" fill="#7d776e" opacity=".55"/>' +
      // Seitentürme mit roten Spitzdächern
      '<rect x="11" y="34" width="18" height="58" fill="url(#bu-turm)"/><rect x="71" y="34" width="18" height="58" fill="url(#bu-turm)"/>' +
      steine(11, 29, 36, 92, 13) + steine(71, 89, 36, 92, 19) +
      fenster(16.5, 46, 7, 10) + fenster(76.5, 46, 7, 10) +
      '<path d="M8.5 35.5 L20 13 L31.5 35.5 Q20 38.5 8.5 35.5 Z" fill="url(#bu-dach)"/>' +
      '<path d="M68.5 35.5 L80 13 L91.5 35.5 Q80 38.5 68.5 35.5 Z" fill="url(#bu-dach)"/>' +
      // Dachziegel-Reihen
      [0, 1].map(function (k) {
        var cx = k ? 80 : 20;
        return [20, 25, 30].map(function (y) { var h = (y - 13) * 0.51; return '<path d="M' + (cx - h) + " " + y + " Q" + cx + " " + (y + 2) + " " + (cx + h) + " " + y + '" stroke="#5e1d18" stroke-width=".7" fill="none" opacity=".5"/>'; }).join("");
      }).join("") +
      '<ellipse cx="20" cy="37.5" rx="9" ry="1.6" fill="#000" opacity=".2" filter="url(#weich)"/><ellipse cx="80" cy="37.5" rx="9" ry="1.6" fill="#000" opacity=".2" filter="url(#weich)"/>' +
      // Holztor mit Steinbogen und Eisenbeschlägen
      '<path d="M38.5 92 V75 A11.5 11.5 0 0 1 61.5 75 V92 Z" fill="#a49d92"/>' +
      '<path d="M41 92 V75.5 A9 9 0 0 1 59 75.5 V92 Z" fill="url(#bu-tor)"/>' +
      '<path d="M44.6 92 V70 M50 92 V66.6 M55.4 92 V70" stroke="#3e2410" stroke-width=".8" opacity=".7"/>' +
      '<path d="M41.5 80 H58.5 M41.5 87 H58.5" stroke="#35302c" stroke-width="1.2"/>' +
      '<circle cx="53.2" cy="83.5" r=".9" fill="#2b2622"/>' +
      // etwas Gras am Fuß der Burg
      '<path d="M9 93 q1.5 -3.5 2.5 0 q1 -4 2.5 0 q1.2 -3 2.4 0 Z M84 93 q1.5 -3.5 2.5 0 q1 -4 2.5 0 q1.2 -3 2.4 0 Z M30 93 q1.2 -3 2.2 0 q1 -3.6 2.2 0 Z M63 93 q1.2 -3 2.2 0 q1 -3.6 2.2 0 Z" fill="#5e9a3e"/>' +
      (ohneFahnen ? "" : fahnen)
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
      varianten: ["orangen", "kirschen", "aepfel"],
      zeichnen: baum,
      standard: "",
      hinweis: function (v) { return "An ihm " + (v === "orangen" ? "hängt " : "hängen ") + FRUECHTE[v].name + "."; }
    },
    prinzessin: {
      name: "Prinzessin mit Krone",
      wer: "Die Prinzessin",
      varianten: ["rubin", "saphir", "smaragd"],
      zeichnen: prinzessin,
      standard: "",
      hinweis: function (v) { return "In ihrer Krone sitzt " + EDELSTEINE[v].name + "."; }
    },
    burg: {
      name: "Burg",
      wer: "Die Burg",
      varianten: ["rot-gruen-orange", "blau-gruen-orange", "rot-blau-gruen"],
      zeichnen: burg,
      standard: "",
      hinweis: function (v) { return "Ihre Fahnen sind " + FAHNEN[v].name + "."; }
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
      // Eigener Hinweistext aus config.js, sonst Platz und Variante direkt
      return eintrag(id).hinweis || MOTIVE[id].wer + " steht " + FELD_TEXT[platz(id)] + ". " + MOTIVE[id].hinweis(loesung(id));
    }
  };
})();
