(function () {
  var WURZEL = new URL("../", document.currentScript.src).href;
  var SCHLUESSEL = "gb-fortschritt-v1";

  var SPIELE = [
    { id: "mastermind", titel: "Obst-Mastermind", symbol: "🍎", datei: "spiele/mastermind.html", text: "Knacke den Obst-Code", motiv: "baum" },
    { id: "quiz", titel: "Quiz", symbol: "❓", datei: "spiele/quiz.html", text: "Wie gut kennst du dich aus?", motiv: "prinzessin" },
    { id: "schiebe", titel: "Schiebepuzzle", symbol: "🧩", datei: "spiele/schiebepuzzle.html", text: "Bring die Zahlen in Ordnung", motiv: "burg" },
    { id: "labyrinth", titel: "Ritter-Labyrinth", symbol: "🏰", datei: "spiele/labyrinth.html", text: "Führe den Ritter zur Burg", motiv: "ritter" }
  ];

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

  function gewinnen(id) {
    var daten = laden();
    var neu = !daten[id];
    daten[id] = true;
    speichern(daten);

    var M = window.Motive, motivId = spiel(id).motiv, motiv = M.MOTIVE[motivId];
    var anzahl = anzahlGewonnen();
    var o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML =
      '<div class="karte">' +
      "<h2>Geschafft!</h2>" +
      "<p>" + (neu ? "Quest gelöst! Neue Figur freigeschaltet:" : "Diese Figur hattest du schon:") + "</p>" +
      '<div class="motiv-gross">' + motiv.zeichnen(M.loesung(motivId)) + "</div>" +
      "<p><strong>" + motiv.name + "</strong></p>" +
      '<p class="hinweis">💡 ' + M.hinweis(motivId) + "</p>" +
      '<p class="leise">' + anzahl + " von 4 Figuren gesammelt</p>" +
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
    konfetti: konfetti,
    zuruecksetzen: function () { speichern({}); },
    spielInfo: spiel
  };
})();
