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
  // (möglichst keine aus der vorigen Runde). Gewonnen ist, wer mindestensRichtig Fragen richtig hat.
  // Die ERSTE Antwort ist immer die richtige, die Reihenfolge wird im Spiel gemischt.
  // Fragen mit "bild" zeigen ein Foto (Datei in site/bilder/royals/). Fehlt das Bild, wird die Frage übersprungen.
  // "quelle" ist die Quellenangabe (Wikimedia Commons). Sie erscheint unter dem Foto und auf bildnachweis.html.
  quiz: {
    fragenProRunde: 10,
    mindestensRichtig: 10,
    fragen: [
      // Großbritannien, erweiterte Familie
      { frage: "Wie hieß das britische Königshaus, bevor es 1917 in Windsor umbenannt wurde?", antworten: ["Sachsen-Coburg und Gotha", "Hannover", "Tudor", "Stuart"] },
      { frage: "Mit welcher Krone wird ein britischer Monarch bei der Krönung gekrönt?", antworten: ["St.-Edwards-Krone", "Imperial State Crown", "Krone von Schottland", "Tudor-Krone"] },
      { frage: "Wie hieß die jüngere Schwester von Queen Elizabeth II.?", antworten: ["Margaret", "Anne", "Mary", "Alexandra"] },
      { frage: "Wie alt wurde Prinz Philip, der Ehemann von Queen Elizabeth II.?", antworten: ["99 Jahre", "95 Jahre", "100 Jahre", "102 Jahre"] },
      { frage: "Wer sind die Eltern von Prinzessin Beatrice und Prinzessin Eugenie?", antworten: ["Andrew und Sarah Ferguson", "Edward und Sophie", "Anne und Mark Phillips", "Charles und Diana"] },
      { frage: "Wie heißt die Tochter von Prinzessin Anne?", antworten: ["Zara Tindall", "Louise Windsor", "Beatrice Mapelli Mozzi", "Lady Amelia Windsor"] },
      { frage: "In welcher Sportart gewann Zara Tindall 2012 eine olympische Silbermedaille?", antworten: ["Vielseitigkeitsreiten", "Segeln", "Rudern", "Hockey"] },
      { frage: "Welchen Titel erhielt Prinz Edward im Jahr 2023?", antworten: ["Herzog von Edinburgh", "Herzog von York", "Herzog von Cornwall", "Prinz von Wales"] },
      { frage: "In welchem Jahr heirateten Prinz William und Catherine Middleton?", antworten: ["2011", "2009", "2012", "2013"] },
      { frage: "Wie heißen die beiden Kinder von Prinz Harry und Meghan?", antworten: ["Archie und Lilibet", "Archie und Charlotte", "Louis und Lilibet", "Arthur und Lily"] },
      { frage: "In welcher Stadt verunglückte Prinzessin Diana 1997 tödlich?", antworten: ["Paris", "London", "Rom", "Monaco"] },
      { frage: "Welchen Titel trägt Camilla seit der Krönung von Charles III.?", antworten: ["Königin", "Prinzessin von Wales", "Herzogin von Cornwall", "Königinmutter"] },
      { frage: "An welchem Tag wurde Charles III. gekrönt?", antworten: ["6. Mai 2023", "8. September 2022", "2. Juni 2023", "21. April 2024"] },
      // Japan
      { frage: "Kaiser Akihito trat 2019 zurück. Wann hatte zuvor zuletzt ein japanischer Kaiser abgedankt?", antworten: ["Vor über 200 Jahren", "1945 nach dem Krieg", "In den 1980er Jahren", "Das war das erste Mal überhaupt"] },
      { frage: "Wer steht in Japan an erster Stelle der Thronfolge?", antworten: ["Prinz Fumihito", "Prinzessin Aiko", "Prinz Hisahito", "Prinzessin Mako"] },
      { frage: "Warum kann Prinzessin Aiko nach heutigem Gesetz nicht Kaiserin werden?", antworten: ["Nur männliche Nachkommen dürfen den Thron erben", "Sie ist noch nicht verheiratet", "Sie hat auf den Thron verzichtet", "Sie lebt nicht in Japan"] },
      { frage: "Wie heißt der Sohn von Prinz Fumihito?", antworten: ["Hisahito", "Haruhito", "Yoshihito", "Masahito"] },
      { frage: "Welchen Beruf hatte Kaiserin Masako vor ihrer Heirat?", antworten: ["Diplomatin", "Ärztin", "Lehrerin", "Pianistin"] },
      { frage: "An welcher Universität machte Kaiserin Masako ihren ersten Abschluss?", antworten: ["Harvard", "Sorbonne", "Yale", "Stanford"] },
      { frage: "Welche Blume ist das Wappen des japanischen Kaiserhauses?", antworten: ["Chrysantheme", "Kirschblüte", "Lotus", "Paulownie"] },
      { frage: "Unter welchem Namen ist Kaiser Hirohito nach seinem Tod bekannt?", antworten: ["Kaiser Showa", "Kaiser Meiji", "Kaiser Taisho", "Kaiser Heisei"] },
      { frage: "Was bedeutet der japanische Kaisertitel Tenno?", antworten: ["Himmlischer Herrscher", "Sohn der Sonne", "Herr der Inseln", "Großer König"] },
      { frage: "Wohin zog Prinzessin Mako nach ihrer Heirat im Jahr 2021?", antworten: ["New York", "London", "Kyoto", "Paris"] },
      { frage: "Welche Stadt war über 1.000 Jahre lang Sitz des japanischen Kaisers?", antworten: ["Kyoto", "Tokio", "Osaka", "Nara"] },
      // Europa
      { frage: "Wie heißt das Königshaus der Niederlande?", antworten: ["Oranien-Nassau", "Bourbon", "Glücksburg", "Bernadotte"] },
      { frage: "Aus welchem Land stammt Königin Máxima der Niederlande?", antworten: ["Argentinien", "Spanien", "Chile", "Uruguay"] },
      { frage: "Wie heißt die niederländische Thronfolgerin?", antworten: ["Catharina-Amalia", "Alexia", "Ariane", "Juliana"] },
      { frage: "Welchen Beruf hatte Königin Letizia von Spanien vor ihrer Heirat?", antworten: ["Fernsehjournalistin", "Anwältin", "Schauspielerin", "Ärztin"] },
      { frage: "Welchen Titel trägt die spanische Thronfolgerin Leonor?", antworten: ["Prinzessin von Asturien", "Prinzessin von Kastilien", "Herzogin von Madrid", "Infantin von Aragon"] },
      { frage: "Wer war vor Felipe VI. König von Spanien?", antworten: ["Juan Carlos I.", "Alfonso XIII.", "Carlos IV.", "Fernando VII."] },
      { frage: "Aus welchem Land stammt Königin Mary von Dänemark?", antworten: ["Australien", "Neuseeland", "Kanada", "Schottland"] },
      { frage: "Welche dänische Königin dankte 2024 nach über 50 Jahren ab?", antworten: ["Margrethe II.", "Ingrid", "Alexandrine", "Mary"] },
      { frage: "Wer war der Gründer des schwedischen Königshauses Bernadotte?", antworten: ["Ein französischer Marschall unter Napoleon", "Ein dänischer Prinz", "Ein deutscher Herzog", "Ein schwedischer Bauernführer"] },
      { frage: "Wie heißt die schwedische Kronprinzessin?", antworten: ["Victoria", "Madeleine", "Estelle", "Sofia"] },
      { frage: "Wie heißt die Ehefrau von Haakon von Norwegen?", antworten: ["Mette-Marit", "Märtha Louise", "Sonja", "Ingrid Alexandra"] },
      { frage: "Wie heißt die belgische Thronfolgerin?", antworten: ["Elisabeth", "Eléonore", "Mathilde", "Astrid"] },
      { frage: "Welche Familie regiert seit Jahrhunderten das Fürstentum Monaco?", antworten: ["Grimaldi", "Medici", "Habsburg", "Savoyen"] },
      { frage: "Welches europäische Land ist ein Großherzogtum?", antworten: ["Luxemburg", "Liechtenstein", "Andorra", "San Marino"] },
      { frage: "Unter welchem Spitznamen kennt man Kaiserin Elisabeth von Österreich?", antworten: ["Sisi", "Lilly", "Mimi", "Bibi"] },
      { frage: "Welcher König ließ das Schloss Neuschwanstein bauen?", antworten: ["Ludwig II. von Bayern", "Friedrich der Große", "Maximilian I. von Bayern", "Wilhelm II."] },
      // Wer ist das? (Bilder in site/bilder/royals/)
      { frage: "Wer ist das?", bild: "bilder/royals/charles.jpg", quelle: { urheber: "White House", lizenz: "Gemeinfrei", lizenzUrl: "", seite: "https://commons.wikimedia.org/wiki/File:King_Charles_III_(July_2023).jpg" }, antworten: ["König Charles III.", "Prinz Edward", "Prinz Michael von Kent", "König Frederik X."] },
      { frage: "Wer ist das?", bild: "bilder/royals/anne.jpg", quelle: { urheber: "UK Home Office", lizenz: "CC BY 4.0", lizenzUrl: "https://creativecommons.org/licenses/by/4.0/", seite: "https://commons.wikimedia.org/wiki/File:Anne,_Princess_Royal_(2025)_(cropped).jpg" }, antworten: ["Prinzessin Anne", "Königin Camilla", "Sophie, Herzogin von Edinburgh", "Königin Margrethe II."] },
      { frage: "Wer ist das?", bild: "bilder/royals/camilla.jpg", quelle: { urheber: "Mark Tantrum", lizenz: "CC BY 4.0", lizenzUrl: "https://creativecommons.org/licenses/by/4.0/", seite: "https://commons.wikimedia.org/wiki/File:Queen_Camilla_in_Aotearoa_2019.jpg" }, antworten: ["Königin Camilla", "Prinzessin Anne", "Sarah Ferguson", "Königin Sonja"] },
      { frage: "Wer ist das?", bild: "bilder/royals/harry.jpg", quelle: { urheber: "Ministerie van Defensie", lizenz: "CC BY-SA 4.0", lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/", seite: "https://commons.wikimedia.org/wiki/File:Prince_Harry_launching_the_2020_Invictus_Games_(cropped).jpg" }, antworten: ["Prinz Harry", "Prinz William", "Peter Phillips", "Prinz Christian von Dänemark"] },
      { frage: "Wer ist das?", bild: "bilder/royals/naruhito.jpg", quelle: { urheber: "Presidencia de Guatemala", lizenz: "Gemeinfrei", lizenzUrl: "", seite: "https://commons.wikimedia.org/wiki/File:Emperor_Naruhito_20250611_(54582524056,_cropped).jpg" }, antworten: ["Kaiser Naruhito", "Prinz Fumihito", "Kaiser Akihito", "Prinz Hisahito"] },
      { frage: "Wer ist das?", bild: "bilder/royals/masako.jpg", quelle: { urheber: "BPMI Setpres", lizenz: "Gemeinfrei", lizenzUrl: "", seite: "https://commons.wikimedia.org/wiki/File:Naruhito_and_Masako_visit_Bogor_Palace_48_(cropped)_(2).jpg" }, antworten: ["Kaiserin Masako", "Kronprinzessin Kiko", "Kaiserin Michiko", "Prinzessin Mako"] },
      { frage: "Wer ist das?", bild: "bilder/royals/aiko.jpg", quelle: { urheber: "外務省 (Außenministerium Japans)", lizenz: "CC BY 4.0", lizenzUrl: "https://creativecommons.org/licenses/by/4.0/", seite: "https://commons.wikimedia.org/wiki/File:Princess_Aiko_(cropped).jpg" }, antworten: ["Prinzessin Aiko", "Prinzessin Kako", "Prinzessin Mako", "Kaiserin Masako"] },
      { frage: "Wer ist das?", bild: "bilder/royals/maxima.jpg", quelle: { urheber: "RVD, Jeroen van der Meyde", lizenz: "CC0 1.0", lizenzUrl: "https://creativecommons.org/publicdomain/zero/1.0/", seite: "https://commons.wikimedia.org/wiki/File:Koningin-maxima-okt-15-s.jpg" }, antworten: ["Königin Máxima", "Königin Letizia", "Königin Mathilde", "Kronprinzessin Victoria"] },
      { frage: "Wer ist das?", bild: "bilder/royals/letizia.jpg", quelle: { urheber: "Esteban González, Emiliano García-Page", lizenz: "CC BY-SA 4.0", lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/", seite: "https://commons.wikimedia.org/wiki/File:Queen_Letizia_2026_(cropped).jpg" }, antworten: ["Königin Letizia", "Königin Máxima", "Königin Mary", "Prinzessin Charlène"] },
      { frage: "Wer ist das?", bild: "bilder/royals/silvia.jpg", quelle: { urheber: "Frankie Fouganthin", lizenz: "CC BY-SA 4.0", lizenzUrl: "https://creativecommons.org/licenses/by-sa/4.0/", seite: "https://commons.wikimedia.org/wiki/File:Queen_Silvia_of_Sweden_in_June_2023-2_(cropped).jpg" }, antworten: ["Königin Silvia", "Königin Sonja", "Königin Margrethe II.", "Königin Paola"] }
    ]
  }
};
