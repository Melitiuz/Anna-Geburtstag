# Projekt: Geburtstags-Spieleseite

## Ziel
Eine Website als Ausgangspunkt für ein Geburtstagsgeschenk.
Sie enthält 4 Minispiele (Quests). Jede gewonnene Quest schaltet eine Figur frei
(Ritter auf Pferd, Baum, Prinzessin mit Krone, Burg).
Die Figuren werden per Drag and Drop in ein leeres 2 x 2 Feld gezogen. Das Feld zeigt keine Vorgaben,
wohin welche Figur gehört, steht nur in den Hinweisen.
Jede Figur hat Varianten, die man durch Antippen durchschaltet: Burg mit drei Fahnen, alle mit demselben Tier
(rot mit Rotkehlchen, blau mit Fisch, gelb mit Löwe, grün mit Schlange), Krone der Prinzessin mit drei gleichen Edelsteinen
(Rubin, Smaragd, Saphir, Diamant), Baum mit Äpfeln, Birnen, Kirschen oder Pflaumen, Ritter reitet nach links oder rechts.
Richtiger Platz, richtige Variante und Hinweistext stehen in `config.js` (`loesung`). Die Hinweise sind bewusst schwer:
Sie nennen keinen Platz und keine Variante direkt, sondern arbeiten mit Verneinungen und Bezügen zu anderen Figuren
und verraten jeweils nur einen Teil, erst alle vier zusammen ergeben
genau eine Lösung (Burg oben links mit Löwen, Prinzessin oben rechts mit Saphiren, Ritter unten links nach links,
Baum unten rechts mit Birnen). Nach jedem gewonnenen Spiel zeigt das Gewinnfenster den Hinweis und die Figur in einer
neutralen Variante (weiße Fahnen, graue Edelsteine, Baum ohne Früchte), damit sie nichts verrät.
Auf der Startseite stehen alle gesammelten Hinweise.
Stimmen bei allen vier Figuren Platz und Variante, erscheint nach "Bestätigen" ein Popup mit der Nachricht zum Geschenk.
Bei einem Fehler steht nur "Noch nicht richtig" (ohne Angabe, welche oder wie viele Figuren falsch sind), dann ist
"Bestätigen" 30 Sekunden gesperrt (Ablauf wird gezählt, gilt dank localStorage `gb-sperre-bis` auch nach Neuladen).

## Aufbau
Die eigentliche Website liegt im Ordner `site/`. Nur dieser Ordner soll später veröffentlicht werden.
- `site/index.html` : Startseite mit Übersicht der 4 Quests, Fortschritt (4 Kästchen, daneben der Knopf 📊, der die Versuche je Quest als Fenster öffnet), 2 x 2 Feld,
  Ablage der Figuren, Hinweisen und Prüfen
- `site/spiele/` : mastermind.html, quiz.html, brueckenritt.html, labyrinth.html
  - Obst-Mastermind: Code aus 5 Früchten (Apfel, Birne, Kirsche, Aprikose, Zwetschge, Zitrone, Wiederholung erlaubt),
    6 Versuche, nach "Einloggen" nur Anzahlen: grün = richtiger Platz, gelb = falscher Platz, rot = falsch
  - Ritter-Labyrinth: 11 x 11 Felder, Burghof (3 x 3) in der Mitte mit genau einem Zugang. Ein Eingang unten in der Mitte,
    der Ritter startet direkt davor. Ein durchgehendes Labyrinth (Tiefensuche) mit Abzweigungen und Sackgassen; der Weg
    zur Burg muss mindestens 2/3 aller Felder durchqueren (MIN_ANTEIL, mindestens 75 von 112), sonst wird neu gewürfelt.
    Jede Heckenberührung erzeugt ein neues Labyrinth und der Ritter beginnt wieder vor dem Eingang
  - Royals-Quiz: Pool von 50 Fragen (Großbritannien inkl. erweiterter Familie, Japan, weitere europäische Königshäuser,
    10 "Wer ist das?"-Fragen mit Foto) in config.js, jede Frage mit "bereich" (gb, eu, jp). Pro Runde 10 Fragen nach
    fester Quote (quote: 4 Großbritannien, 4 Europa, 2 Japan), zufällig und ohne Wiederholung aus der vorigen Runde,
    Antworten gemischt (erste Antwort im Pool ist die richtige). Pro Runde 3 Minuten Zeit, nur als ablaufender Balken über den
    Fragen sichtbar (keine Zahlen); läuft sie ab, ist die Runde verloren ("Die Zeit ist um!"). Keine Rückmeldung pro Frage, am Ende nur "Toll"
    (mindestensRichtig erreicht, derzeit 10 von 10) oder "Pech gehabt, nächstes Mal mehr Glück".
    Fotos gehören nach site/bilder/royals/ (charles, anne, camilla, harry, naruhito, masako, aiko, maxima, letizia,
    silvia als .jpg, von Wikimedia Commons). Fehlt ein Foto, wird die Frage automatisch weggelassen.
    Quellenangabe je Foto steht in config.js (quelle) und erscheint unter dem Foto sowie auf site/bildnachweis.html
    (verlinkt im Fuß der Startseite). Neue Fotos nur mit freier Lizenz und mit Quellenangabe einbinden.
  - Brückenritt (Geschicklichkeit): Seitwärts-Laufspiel, der Ritter galoppiert automatisch (Beine einzeln animiert, Tag geht
    zur Burg hin in Abendstimmung über). Kurz tippen = kleiner Sprung,
    gedrückt halten = hoher Sprung. Hindernisse: Steine, Doppelsteine, entgegenlaufende Wölfe und Wolfspaare, hohe
    Hecken (nur hoher Sprung), tief hängende Äste (nicht springen), Stein direkt vor Ast, rollende Fässer, Gruben, fliegende
    Raben in Kopfhöhe (unten bleiben) und schwebende Raben über Stein oder Grube (nur hoher Sprung). Kombinationen: Grube vor Hecke,
    Stein vor Grube, Rabenpaar, Ast mit Wolf dahinter. Unberechenbar: Wölfe laufen verschieden schnell, die Hälfte springt
    plötzlich hoch, die Hälfte der fliegenden Raben stößt im Sturzflug herab, Fässer rollen verschieden schnell.
    Im letzten Drittel zieht Nebel auf (Hindernisse schimmern nur schwach durch), vor dem Graben lichtet er sich. Auf der Seite stehen bewusst keine
    Steuerungstipps. Springen per Tippen aufs Spielfeld oder über den großen Knopf darunter (Losreiten, Springen, Noch
    einmal). 30 Hölzer, nur an riskanten Stellen: über Steinen, Hecken und Raben, unter Ästen, im Bogen über Gruben,
    direkt vor Steinen und hoch zwischen zwei Steinen (ein hoher Sprung über beide).
    Jeder Zusammenstoß kostet 3 Hölzer. Am Ende ein Burggraben: mindestens 24 Hölzer ergeben die Brücke zur Burg.
    Strecke aus zufälligen Mustern, Tempo steigt von 280 auf 430, dichte Abstände. Mit ?test in der Adresse gibt es einen Testzugang
    (window.spielTest) für automatische Durchläufe
- `site/js/config.js` : Name der beschenkten Person, Nachricht im Popup (Text, Link, Gruß), Lösung (Platz und Variante je Figur) und Quizfragen
- `site/js/motive.js` : die vier Figuren mit ihren Varianten als SVG, Hinweistexte und die Felder des 2 x 2 Rasters
- `site/js/fortschritt.js` : Speichern des Fortschritts und der Statistik, Zuordnung Spiel zu Motiv, Gewinn-Overlay, Konfetti,
  Quest-Icons: Krone 👑 und Burg 🏰 als Emoji, Obstkorb und Ritter vor dem Heckenlabyrinth als SVG im Emoji-Stil;
  in Spielseiten über `<span data-icon="...">` eingesetzt
  - Statistik: Fortschritt.versuch(id) zählt einen Versuch. Mastermind ab dem ersten eingeloggten Tipp, Quiz ab der ersten
    Antwort einer Runde, Brückenritt beim Losreiten, Labyrinth sobald sich der Ritter in einem neuen Labyrinth bewegt.
    Beim ersten Sieg wird gespeichert, im wievielten Versuch die Quest gelöst wurde
- `werkzeuge/server.ps1` : Testserver ohne Python/Node (`powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1`, dann http://localhost:8080)
  - mit `-Netz` auch im WLAN erreichbar, z. B. vom Handy unter http://192.168.178.26:8080/ (Firewall-Freigabe für private Netzwerke nötig)

Zuordnung Spiel zu Motiv: Obst-Mastermind → Baum, Royals-Quiz → Prinzessin, Brückenritt → Burg, Ritter-Labyrinth → Ritter.

## Technik
- Rein statische Website: HTML, CSS und JavaScript, kein Server, keine Datenbank
- Mobile first: alle Spiele und das Drag and Drop müssen per Touch auf dem Handy funktionieren (Pointer Events, nicht HTML5 Drag and Drop)
- Fortschritt im Browser speichern (localStorage, in try/catch), damit freigeschaltete Motive nicht verloren gehen
- Keine externen Abhängigkeiten außer bei echtem Bedarf (einzige Ausnahme: Google Fonts)

## Hosting und Workflow
- Code liegt im GitHub Repository https://github.com/Melitiuz/Anna-Geburtstag (derzeit privat, soll später öffentlich werden)
- Commits mit Autor `Melitiuz <Melitiuz@users.noreply.github.com>` (im Repository eingestellt)
- **Noch nicht veröffentlichen.** Die Seite geht erst online, wenn der Nutzer es ausdrücklich sagt.
- Geplantes Hosting: GitHub Pages (Adresse dann https://melitiuz.github.io/Anna-Geburtstag/).
  Die Veröffentlichungs-Automatik (Workflow) wurde bewusst wieder entfernt und wird erst bei Bedarf angelegt.

## Design
- Angelehnt an den Stil von Boda Borg (dem Ort des Geschenks): schwarzer Hintergrund mit rotem Schimmer,
  Rot `#d62b2b` als Akzent, rot umrandete Kästen, rote Knöpfe in schmalen Großbuchstaben, kräftige Überschriften
- Spiele heißen "Quests" (Quest 1 bis 4), der letzte Schritt "Finale"
- Kein Logo, keine Bilder und kein Name von Boda Borg auf der Seite, nur der Stil
- Schriften über Google Fonts (`@import` in `stil.css`): Rubik (Überschriften), Barlow Condensed (Knöpfe, Beschriftungen), Roboto (Text)
- Die Figuren bleiben bunt im Comic-Stil

## Sprache und Stil
- Alle Texte auf der Website auf Deutsch
- Keine Gedankenstriche (em-dashes) in Texten
- Kein Komma vor "und"

## Offene Punkte
- [x] Name der beschenkten Person: Anna
- [x] Geschenk-Link: https://www.bodaborg.de/bochum/
- [ ] Nachricht zum Geschenk (Text folgt)
- [x] Spiele: Obst-Mastermind, Royals-Quiz, Brückenritt (Geschicklichkeit), Ritter-Labyrinth
- [x] Quizfragen: 50 Fragen zum Thema Royals (auch Japan), 10 pro Runde
- [x] Fotos für die 10 "Wer ist das?"-Fragen (Wikimedia Commons, freie Lizenzen, Nachweis auf bildnachweis.html)
- [ ] Veröffentlichen (später, voraussichtlich GitHub Pages)
