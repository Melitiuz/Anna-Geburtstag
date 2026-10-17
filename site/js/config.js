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

  // Quiz zum Thema Royals: Pro Runde werden zufällig fragenProRunde Fragen aus dem Pool gezogen
  // (keine aus der vorigen Runde). Gewonnen ist nur, wenn alle richtig beantwortet sind.
  // Die ERSTE Antwort ist immer die richtige, die Reihenfolge wird im Spiel gemischt.
  quiz: {
    fragenProRunde: 5,
    fragen: [
      // Großbritannien
      { frage: "Wie heißt der König des Vereinigten Königreichs seit 2022?", antworten: ["Charles III.", "William V.", "George VII.", "Edward IX."] },
      { frage: "Wie lange regierte Queen Elizabeth II.?", antworten: ["Mehr als 70 Jahre", "Rund 50 Jahre", "Rund 60 Jahre", "Rund 80 Jahre"] },
      { frage: "Wie heißt die offizielle Residenz des britischen Monarchen in London?", antworten: ["Buckingham Palace", "Windsor Castle", "Kensington Palace", "Tower of London"] },
      { frage: "Wer ist der britische Thronfolger?", antworten: ["Prinz William", "Prinz Harry", "Prinz George", "Prinzessin Anne"] },
      { frage: "In welcher Kirche werden britische Monarchen gekrönt?", antworten: ["Westminster Abbey", "St Paul's Cathedral", "Canterbury Cathedral", "St George's Chapel"] },
      { frage: "Wie heißt das schottische Schloss, in dem die britischen Royals traditionell den Sommer verbringen?", antworten: ["Balmoral", "Holyrood", "Edinburgh Castle", "Sandringham"] },
      { frage: "Wie viele Kinder haben Prinz William und Prinzessin Catherine?", antworten: ["Drei", "Zwei", "Vier", "Eins"] },
      { frage: "Welchen Spitznamen bekam Prinzessin Diana?", antworten: ["Königin der Herzen", "Eiserne Lady", "Rosenprinzessin", "Lady Sunshine"] },
      { frage: "In welches Land zogen Prinz Harry und Meghan nach ihrem Rückzug aus dem Königshaus?", antworten: ["USA", "Kanada", "Australien", "Südafrika"] },
      // Japan
      { frage: "Wie heißt der Kaiser von Japan seit 2019?", antworten: ["Naruhito", "Akihito", "Hirohito", "Fumihito"] },
      { frage: "Wie heißt die Ära, die 2019 mit Kaiser Naruhito in Japan begann?", antworten: ["Reiwa", "Heisei", "Showa", "Meiji"] },
      { frage: "Wie heißt die Ehefrau von Kaiser Naruhito?", antworten: ["Masako", "Michiko", "Kiko", "Akiko"] },
      { frage: "Wie heißt die Tochter von Kaiser Naruhito?", antworten: ["Aiko", "Mako", "Kako", "Yoko"] },
      { frage: "Wie wird der Thron des japanischen Kaisers genannt?", antworten: ["Chrysanthementhron", "Kirschblütenthron", "Drachenthron", "Pfauenthron"] },
      { frage: "Welches Land ist heute das einzige mit einem regierenden Kaiser?", antworten: ["Japan", "China", "Thailand", "Südkorea"] },
      { frage: "In welcher Stadt steht der Kaiserpalast, in dem der japanische Kaiser heute lebt?", antworten: ["Tokio", "Kyoto", "Osaka", "Nara"] },
      { frage: "Was geschah, als die japanische Prinzessin Mako 2021 einen Bürgerlichen heiratete?", antworten: ["Sie verlor ihren Status als Mitglied des Kaiserhauses", "Sie wurde zur Kronprinzessin ernannt", "Ihr Mann bekam einen Adelstitel", "Sie musste in den Kaiserpalast ziehen"] },
      // Europa
      { frage: "Wie heißt der König von Spanien?", antworten: ["Felipe VI.", "Juan Carlos II.", "Carlos V.", "Alfonso XIV."] },
      { frage: "Welche Hollywood-Schauspielerin wurde 1956 Fürstin von Monaco?", antworten: ["Grace Kelly", "Audrey Hepburn", "Marilyn Monroe", "Elizabeth Taylor"] },
      { frage: "Aus welchem Land stammt Königin Silvia von Schweden?", antworten: ["Deutschland", "Österreich", "Brasilien", "Dänemark"] }
    ]
  }
};
