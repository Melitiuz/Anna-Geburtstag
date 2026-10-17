(function () {
  var WURZEL = new URL("../", document.currentScript.src).href;
  var SCHLUESSEL = "gb-fortschritt-v1";

  // Reihenfolge der Bildteile: 0 oben links, 1 oben rechts, 2 unten links, 3 unten rechts
  var T = ["cXIvbTN4OS5wbmc=", "cXIvdDViMi5wbmc=", "cXIvcjhkMS5wbmc=", "cXIvdzJrNi5wbmc="];

  var SPIELE = [
    { id: "memory", titel: "Memory", symbol: "🃏", datei: "spiele/memory.html", text: "Finde alle Paare", teil: 2 },
    { id: "quiz", titel: "Quiz", symbol: "❓", datei: "spiele/quiz.html", text: "Wie gut kennst du dich aus?", teil: 0 },
    { id: "schiebe", titel: "Schiebepuzzle", symbol: "🧩", datei: "spiele/schiebepuzzle.html", text: "Bring die Zahlen in Ordnung", teil: 3 },
    { id: "kerzen", titel: "Kerzen auspusten", symbol: "🕯️", datei: "spiele/kerzen.html", text: "Schnelle Finger gefragt", teil: 1 }
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

  function platzhalter(teil) {
    var c = document.createElement("canvas");
    c.width = c.height = 300;
    var g = c.getContext("2d");
    g.fillStyle = "#fff";
    g.fillRect(0, 0, 300, 300);
    g.fillStyle = "#2b1d2e";
    for (var y = 0; y < 15; y++) for (var x = 0; x < 15; x++) {
      if ((x * 7 + y * 13 + teil * 5) % 3 === 0) g.fillRect(x * 20, y * 20, 20, 20);
    }
    g.fillStyle = "rgba(232,70,110,0.92)";
    g.fillRect(40, 110, 220, 80);
    g.fillStyle = "#fff";
    g.font = "bold 26px sans-serif";
    g.textAlign = "center";
    g.fillText("Platzhalter " + (teil + 1), 150, 160);
    return c;
  }

  // Liefert ein Bild des Viertels. Fehlt die Datei noch, wird ein Platzhalter gezeichnet.
  function viertelBild(teil, klasse) {
    var img = new Image();
    img.alt = "Ein Teil des Rätsels";
    img.draggable = false;
    if (klasse) img.className = klasse;
    img.onerror = function () {
      var c = platzhalter(teil);
      if (klasse) c.className = klasse;
      if (img.parentNode) img.parentNode.replaceChild(c, img);
    };
    img.src = WURZEL + atob(T[teil]);
    return img;
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

    var s = spiel(id);
    var anzahl = anzahlGewonnen();
    var o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML =
      '<div class="karte">' +
      "<h2>Geschafft! 🎉</h2>" +
      "<p>" + (neu ? "Du hast ein neues Viertel gewonnen." : "Dieses Viertel hattest du schon.") + "</p>" +
      '<div class="platz"></div>' +
      '<p class="leise">' + anzahl + " von 4 Vierteln gesammelt</p>" +
      '<a class="knopf breit" href="' + WURZEL + 'index.html">Zur Übersicht</a>' +
      "</div>";
    o.querySelector(".platz").appendChild(viertelBild(s.teil, "viertel"));
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
    viertelBild: viertelBild,
    konfetti: konfetti,
    zuruecksetzen: function () { speichern({}); },
    spielInfo: spiel
  };
})();
