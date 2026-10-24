(function () {
  var WURZEL = new URL("../", document.currentScript.src).href;
  var SCHLUESSEL = "gb-fortschritt-v1";

  // Icons der Quests. Krone und Burg sind Emojis, Obstkorb und Heckenlabyrinth gibt es nicht als Emoji:
  // sie sind als SVG im gleichen weichen Emoji-Stil gezeichnet (Verläufe, Glanzlichter, keine Umrisse).
  function icon(inhalt) { return '<svg class="icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inhalt + "</svg>"; }
  function verlauf(id, stops, radial) {
    var s = stops.map(function (f, i) { return '<stop offset="' + (i / (stops.length - 1)) + '" stop-color="' + f + '"/>'; }).join("");
    return radial
      ? '<radialGradient id="' + id + '" cx=".35" cy=".3" r=".8">' + s + "</radialGradient>"
      : '<linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' + s + "</linearGradient>";
  }
  var flechten = "";
  for (var reihe = 0; reihe < 3; reihe++) {
    for (var k = 0; k < 6; k++) {
      var y = 41 + reihe * 6.5, x = 14 + k * 7.3 + (reihe % 2) * 3.6 + reihe * 0.8;
      flechten += '<ellipse cx="' + x.toFixed(1) + '" cy="' + y + '" rx="3" ry="2.1" fill="#f3c27e" opacity=".55"/>';
    }
  }
  var ICONS = {
    // Obstkorb
    mastermind: icon(
      "<defs>" +
      verlauf("ik-apfel", ["#ff8a7a", "#e3262b", "#a3121b"], true) + verlauf("ik-birne", ["#fff59a", "#d9cf2e", "#98951a"], true) +
      verlauf("ik-aprikose", ["#ffd59a", "#f6952a", "#c4620c"], true) + verlauf("ik-kirsche", ["#ff7a8a", "#c4102f", "#6e0818"], true) +
      verlauf("ik-korb", ["#e6aa63", "#bb7a3c", "#8a5122"]) + verlauf("ik-rand", ["#d4954f", "#8a5424"]) +
      "</defs>" +
      '<path d="M12 33 C12 5 52 5 52 33" stroke="#8a5424" stroke-width="4.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M13 31 C14 9 50 9 51 31" stroke="#c98b48" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M40 12 C44 14 44 20 47 25 C50 31 46 37 40 37 C34 37 30 31 33 25 C36 20 36 14 40 12 Z" fill="url(#ik-birne)"/>' +
      '<path d="M40 12 l1.2 -4" stroke="#6b4a2a" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="21" cy="27" r="10.5" fill="url(#ik-apfel)"/><ellipse cx="17.5" cy="22.5" rx="3.2" ry="2.2" fill="#fff" opacity=".55"/>' +
      '<path d="M21 17 l1 -4" stroke="#6b4a2a" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M22 13 C25 8 31 9 31 11 C28 14 24 14 22 13 Z" fill="#4fbf5a"/>' +
      '<circle cx="31.5" cy="31" r="8" fill="url(#ik-aprikose)"/><ellipse cx="29" cy="28" rx="2.4" ry="1.6" fill="#fff" opacity=".5"/>' +
      '<path d="M48.5 30 Q50 20 54 17 Q55.5 23 55 29" stroke="#3f7a2a" stroke-width="1.6" fill="none"/>' +
      '<circle cx="48.5" cy="31.5" r="4.4" fill="url(#ik-kirsche)"/><circle cx="55.2" cy="30.5" r="4.4" fill="url(#ik-kirsche)"/>' +
      '<circle cx="47.2" cy="30" r="1.2" fill="#fff" opacity=".6"/><circle cx="53.9" cy="29" r="1.2" fill="#fff" opacity=".6"/>' +
      '<path d="M8 34 H56 L50.5 55.5 Q49.7 59 46.5 59 H17.5 Q14.3 59 13.5 55.5 Z" fill="url(#ik-korb)"/>' +
      flechten +
      '<path d="M10.5 44.5 H53.5 M12.2 51 H51.8" stroke="#7a4519" stroke-width="1.2" opacity=".5"/>' +
      '<rect x="6" y="30.5" width="52" height="7" rx="3.5" fill="url(#ik-rand)"/>' +
      '<rect x="9" y="31.5" width="46" height="1.8" rx=".9" fill="#f0bf80" opacity=".7"/>'
    ),
    quiz: "👑",
    brueckenritt: "🏰",
    // Ritter vor dem Heckenlabyrinth, in der Mitte die Burg
    labyrinth: icon(
      "<defs>" +
      verlauf("ik-sand", ["#fff1c9", "#ecd59a", "#cdae6a"], true) + verlauf("ik-helm", ["#ffffff", "#b9c2cd", "#6e7884"], true) +
      verlauf("ik-feder", ["#ff8fa8", "#e8466e", "#a8204a"], true) + verlauf("ik-turm", ["#eef1f5", "#a9b2be"]) +
      "</defs>" +
      '<rect x="2" y="2" width="60" height="60" rx="13" fill="url(#ik-sand)"/>' +
      '<g fill="none" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M26 58 H6 V6 H58 V58 H38 M16 16 H48 V48 H16 V28 M48 31 H58 M6 40 H11 M26 48 V40" stroke="#2c8a3c" stroke-width="7"/>' +
      '<path d="M26 57.2 H6 V6 H58 V57.2 H38 M16 16 H48 V48 H16 V28 M48 31 H58 M6 40 H11 M26 48 V40" stroke="#62c96c" stroke-width="2.6" transform="translate(-.8 -1)"/>' +
      "</g>" +
      '<circle cx="12" cy="6" r="1.5" fill="#e03a4a"/><circle cx="58" cy="20" r="1.5" fill="#e03a4a"/><circle cx="34" cy="16" r="1.5" fill="#e03a4a"/><circle cx="16" cy="42" r="1.5" fill="#e03a4a"/>' +
      '<rect x="27.5" y="27" width="9" height="11" rx="1" fill="url(#ik-turm)"/><path d="M26.5 27.5 L32 20 L37.5 27.5 Z" fill="#e0353c"/>' +
      '<rect x="30.5" y="32" width="3" height="6" rx="1.5" fill="#6a3f25"/><path d="M32 20 V15" stroke="#6a3f25" stroke-width="1"/><path d="M32 15 L36.5 16.5 L32 18 Z" fill="#f6c544"/>' +
      '<path d="M30.5 43 C28 35 39 32.5 42 38.5 C38.5 37.5 35.5 39.5 34.5 43 Z" fill="url(#ik-feder)"/>' +
      '<circle cx="32" cy="50" r="7.5" fill="url(#ik-helm)"/>' +
      '<rect x="26.5" y="48.3" width="11" height="3.2" rx="1.6" fill="#2b2433"/><path d="M32 42.5 V48 M32 52 V57.5" stroke="#7e8894" stroke-width="1.2" opacity=".7"/>' +
      '<ellipse cx="29" cy="45.5" rx="2.2" ry="1.4" fill="#fff" opacity=".7"/>'
    )
  };

  var SPIELE = [
    { id: "mastermind", titel: "Obst-Mastermind", symbol: ICONS.mastermind, datei: "spiele/mastermind.html", text: "Knacke den Obst-Code", motiv: "baum" },
    { id: "quiz", titel: "Royals-Quiz", symbol: ICONS.quiz, datei: "spiele/quiz.html", text: "Wie gut kennst du die Königshäuser?", motiv: "prinzessin" },
    { id: "brueckenritt", titel: "Brückenritt", symbol: ICONS.brueckenritt, datei: "spiele/brueckenritt.html", text: "Sammle Holz für die Brücke zur Burg", motiv: "burg" },
    { id: "labyrinth", titel: "Ritter-Labyrinth", symbol: ICONS.labyrinth, datei: "spiele/labyrinth.html", text: "Führe den Ritter zur Burg", motiv: "ritter" }
  ];

  // Platzhalter <span data-icon="..."> in den Spielseiten mit dem passenden Icon füllen
  function iconsEinsetzen() {
    var orte = document.querySelectorAll("[data-icon]");
    for (var i = 0; i < orte.length; i++) if (ICONS[orte[i].getAttribute("data-icon")]) orte[i].innerHTML = ICONS[orte[i].getAttribute("data-icon")];
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iconsEinsetzen);
  else iconsEinsetzen();

  var speicherErsatz = {};

  function laden() {
    try {
      var roh = localStorage.getItem(SCHLUESSEL);
      return roh ? JSON.parse(roh) : {};
    } catch (e) {
      return speicherErsatz;
    }
  }

  function speichern(daten) {
    speicherErsatz = daten;
    try { localStorage.setItem(SCHLUESSEL, JSON.stringify(daten)); } catch (e) {}
  }

  function spiel(id) {
    for (var i = 0; i < SPIELE.length; i++) if (SPIELE[i].id === id) return SPIELE[i];
    return null;
  }

  function konfetti() {
    var farben = ["#d62b2b", "#ffffff", "#f6c544", "#ff6b6b", "#8a1a1a"];
    var box = document.createElement("div");
    box.className = "konfetti";
    for (var i = 0; i < 80; i++) {
      var s = document.createElement("i");
      s.style.left = Math.random() * 100 + "vw";
      s.style.background = farben[i % farben.length];
      s.style.animationDuration = 2 + Math.random() * 2 + "s";
      s.style.animationDelay = Math.random() * 0.6 + "s";
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 5000);
  }

  // Statistik: Versuche je Quest und im wievielten Versuch sie zum ersten Mal gelöst wurde
  function statistik(daten) {
    var s = daten.statistik || {};
    s.versuche = s.versuche || {};
    s.geloestNach = s.geloestNach || {};
    return s;
  }

  function versuch(id) {
    var daten = laden();
    var s = statistik(daten);
    s.versuche[id] = (s.versuche[id] || 0) + 1;
    daten.statistik = s;
    speichern(daten);
  }

  function gewinnen(id) {
    var daten = laden();
    var neu = !daten[id];
    daten[id] = true;
    var s = statistik(daten);
    if (neu) s.geloestNach[id] = Math.max(1, s.versuche[id] || 0);
    daten.statistik = s;
    speichern(daten);

    var M = window.Motive, motivId = spiel(id).motiv, motiv = M.MOTIVE[motivId];
    var anzahl = anzahlGewonnen();
    var o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML =
      '<div class="karte">' +
      "<h2>Geschafft!</h2>" +
      "<p>" + (neu ? "Quest gelöst! Neue Figur freigeschaltet:" : "Diese Figur hattest du schon:") + "</p>" +
      '<div class="motiv-gross">' + motiv.svg + "</div>" +
      "<p><strong>" + motiv.name + "</strong></p>" +
      '<p class="hinweis">💡 ' + M.hinweis(motivId) + "</p>" +
      '<p class="leise">' + anzahl + " von 4 Figuren gesammelt" +
      (neu ? ", gelöst im " + s.geloestNach[id] + ". Versuch" : "") + "</p>" +
      '<a class="knopf breit" href="' + WURZEL + 'index.html">Zur Übersicht</a>' +
      "</div>";
    document.body.appendChild(o);
    konfetti();
  }

  function anzahlGewonnen() {
    var daten = laden();
    return SPIELE.filter(function (s) { return daten[s.id]; }).length;
  }

  window.Fortschritt = {
    SPIELE: SPIELE,
    wurzel: WURZEL,
    gewonnen: function (id) { return !!laden()[id]; },
    anzahlGewonnen: anzahlGewonnen,
    gewinnen: gewinnen,
    versuch: versuch,
    statistik: function () { return statistik(laden()); },
    konfetti: konfetti,
    // Versteckter 5. Hinweis (Apfel an den Ritter verfüttert)
    geheimnisGefunden: function () { return !!laden().geheimnis; },
    geheimnisFinden: function () { var d = laden(); d.geheimnis = true; speichern(d); },
    zuruecksetzen: function () { speichern({}); },
    spielInfo: spiel
  };
})();
