(function () {
  var WURZEL = new URL("../", document.currentScript.src).href;
  var SCHLUESSEL = "gb-fortschritt-v1";

  var SPIELE = [
    { id: "memory", titel: "Memory", symbol: "🃏", datei: "spiele/memory.html", text: "Finde alle Paare", motiv: "baum" },
    { id: "quiz", titel: "Quiz", symbol: "❓", datei: "spiele/quiz.html", text: "Wie gut kennst du dich aus?", motiv: "prinzessin" },
    { id: "schiebe", titel: "Schiebepuzzle", symbol: "🧩", datei: "spiele/schiebepuzzle.html", text: "Bring die Zahlen in Ordnung", motiv: "burg" },
    { id: "kerzen", titel: "Kerzen auspusten", symbol: "🕯️", datei: "spiele/kerzen.html", text: "Schnelle Finger gefragt", motiv: "ritter" }
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
    var farben = ["#e8466e", "#f59e2c", "#7c5cff", "#2fae6b", "#3fb5e8"];
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

    var motiv = window.Motive.MOTIVE[spiel(id).motiv];
    var anzahl = anzahlGewonnen();
    var o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML =
      '<div class="karte">' +
      "<h2>Geschafft! 🎉</h2>" +
      "<p>" + (neu ? "Du hast ein neues Motiv freigeschaltet:" : "Dieses Motiv hattest du schon:") + "</p>" +
      '<div class="motiv-gross">' + motiv.svg + "</div>" +
      "<p><strong>" + motiv.name + "</strong></p>" +
      '<p class="leise">' + anzahl + " von 4 Motiven gesammelt</p>" +
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
