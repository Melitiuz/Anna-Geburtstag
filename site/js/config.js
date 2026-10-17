// Alles, was persönlich angepasst werden soll, steht hier.
window.GEBURTSTAG = {
  name: "Anna",

  // Erscheint als Popup, wenn alle vier Motive richtig im Bild liegen.
  // link ist optional: leer lassen ("") wenn kein Knopf erscheinen soll.
  nachricht: {
    // Text ist noch ein Platzhalter und wird später ergänzt
    titel: "Herzlichen Glückwunsch, Anna!",
    text: "Du hast alle Spiele gemeistert und das Bild vervollständigt. Ich wünsche dir einen wunderschönen Geburtstag voller Freude und Überraschungen. Dein Geschenk wartet hier auf dich:",
    link: "https://www.bodaborg.de/bochum/",
    linkText: "Zum Geschenk",
    gruss: "Alles Liebe"
  },

  // Quiz: Fragen über die beschenkte Person. "richtig" ist der Index der richtigen Antwort (ab 0).
  quiz: {
    mindestensRichtig: 4,
    fragen: [
      { frage: "In welchem Monat hast du Geburtstag?", antworten: ["Im Januar", "Heute natürlich", "Im August", "Weiß ich nicht"], richtig: 1 },
      { frage: "Was gehört auf jeden Geburtstagskuchen?", antworten: ["Senf", "Kerzen", "Gurken", "Ketchup"], richtig: 1 },
      { frage: "Wie viele Viertel hat ein QR Code in diesem Spiel?", antworten: ["Zwei", "Drei", "Vier", "Acht"], richtig: 2 },
      { frage: "Was macht man mit den Kerzen?", antworten: ["Auspusten", "Essen", "Verschenken", "Anmalen"], richtig: 0 },
      { frage: "Was wartet am Ende auf dich?", antworten: ["Hausaufgaben", "Ein Geschenk", "Ein Strafzettel", "Nichts"], richtig: 1 }
    ]
  }
};
