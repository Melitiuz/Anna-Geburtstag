// Alles, was persönlich angepasst werden soll, steht hier.
window.GEBURTSTAG = {
  name: "Anna",

  // Erscheint als Popup, wenn alle vier Figuren richtig im Feld liegen.
  // link ist optional: leer lassen ("") wenn kein Knopf erscheinen soll.
  nachricht: {
    // Text ist noch ein Platzhalter und wird später ergänzt
    titel: "Herzlichen Glückwunsch, Anna!",
    text: "Du hast alle Spiele gemeistert und das Bild vervollständigt. Ich wünsche dir einen wunderschönen Geburtstag voller Freude und Überraschungen. Dein Geschenk wartet hier auf dich:",
    link: "https://www.bodaborg.de/bochum/",
    linkText: "Zum Geschenk",
    gruss: "Alles Liebe"
  },

  // Richtiger Platz im 2 x 2 Feld und richtige Variante jeder Figur.
  // Den passenden Hinweis bekommt Anna nach dem jeweiligen Spiel.
  //   platz: "oben-links", "oben-rechts", "unten-links" oder "unten-rechts" (jeder Platz nur einmal)
  //   burg: 1 bis 4 Flaggen | prinzessin: 1 bis 4 Edelsteine in der Krone
  //   baum: "aepfel", "birnen", "kirschen" oder "pflaumen" | ritter: "links" oder "rechts"
  loesung: {
    burg: { platz: "oben-links", variante: 3 },
    prinzessin: { platz: "oben-rechts", variante: 2 },
    baum: { platz: "unten-rechts", variante: "kirschen" },
    ritter: { platz: "unten-links", variante: "links" }
  },

  // Quiz: Fragen über die beschenkte Person. "richtig" ist der Index der richtigen Antwort (ab 0).
  quiz: {
    mindestensRichtig: 4,
    fragen: [
      { frage: "In welchem Monat hast du Geburtstag?", antworten: ["Im Januar", "Heute natürlich", "Im August", "Weiß ich nicht"], richtig: 1 },
      { frage: "Was gehört auf jeden Geburtstagskuchen?", antworten: ["Senf", "Kerzen", "Gurken", "Ketchup"], richtig: 1 },
      { frage: "Wie viele Figuren musst du sammeln?", antworten: ["Zwei", "Drei", "Vier", "Acht"], richtig: 2 },
      { frage: "Was macht man mit den Kerzen?", antworten: ["Auspusten", "Essen", "Verschenken", "Anmalen"], richtig: 0 },
      { frage: "Was wartet am Ende auf dich?", antworten: ["Hausaufgaben", "Ein Geschenk", "Ein Strafzettel", "Nichts"], richtig: 1 }
    ]
  }
};
