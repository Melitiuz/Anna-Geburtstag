# Projekt: Geburtstags-Spieleseite

## Ziel
Eine Website als Ausgangspunkt für ein Geburtstagsgeschenk.
Sie enthält 4 Minispiele (Quests). Jede gewonnene Quest schaltet eine Figur frei
(Ritter auf Pferd, Baum, Prinzessin mit Krone, Burg).
Die Figuren werden per Drag and Drop in ein leeres 2 x 2 Feld gezogen. Das Feld zeigt keine Vorgaben,
wohin welche Figur gehört, steht nur in den Hinweisen.
Jede Figur hat Varianten, die man durch Antippen durchschaltet: Burg 1 bis 4 Flaggen, Krone der Prinzessin
1 bis 4 Edelsteine, Baum mit Äpfeln, Birnen, Kirschen oder Pflaumen, Ritter reitet nach links oder rechts.
Richtiger Platz und richtige Variante stehen in `config.js` (`loesung`). Nach jedem gewonnenen Spiel zeigt das
Gewinnfenster den passenden Hinweis (z. B. "Die Burg steht oben links. Auf ihr wehen drei Flaggen."),
auf der Startseite stehen alle gesammelten Hinweise.
Stimmen bei allen vier Figuren Platz und Variante, erscheint nach "Bestätigen" ein Popup mit der Nachricht zum Geschenk.

## Aufbau
Die eigentliche Website liegt im Ordner `site/`. Nur dieser Ordner soll später veröffentlicht werden.
- `site/index.html` : Startseite mit Übersicht der 4 Quests, Fortschritt, 2 x 2 Feld, Ablage der Figuren, Hinweisen und Prüfen
- `site/spiele/` : mastermind.html, quiz.html, schiebepuzzle.html, labyrinth.html
  - Obst-Mastermind: Code aus 5 Früchten (Apfel, Birne, Kirsche, Aprikose, Zwetschge, Zitrone, Wiederholung erlaubt),
    7 Versuche, nach "Einloggen" nur Anzahlen: grün = richtiger Platz, gelb = falscher Platz, rot = falsch
  - Ritter-Labyrinth: 11 x 11 Felder, Burghof (3 x 3) in der Mitte mit genau einem Zugang. Ein Eingang unten in der Mitte,
    der Ritter startet direkt davor. Ein durchgehendes Labyrinth (Tiefensuche) mit Abzweigungen und Sackgassen; der Weg
    zur Burg muss mindestens 2/3 aller Felder durchqueren (MIN_ANTEIL, mindestens 75 von 112), sonst wird neu gewürfelt.
    Jede Heckenberührung erzeugt ein neues Labyrinth und der Ritter beginnt wieder vor dem Eingang
  - Royals-Quiz: Pool von 50 Fragen (Großbritannien inkl. erweiterter Familie, Japan, weitere europäische Königshäuser,
    10 "Wer ist das?"-Fragen mit Foto) in config.js. Pro Runde 10 zufällige ohne Wiederholung aus der vorigen Runde,
    Antworten gemischt (erste Antwort im Pool ist die richtige). Keine Rückmeldung pro Frage, am Ende nur "Toll"
    (mindestensRichtig erreicht, derzeit 10 von 10) oder "Pech gehabt, nächstes Mal mehr Glück".
    Fotos gehören nach site/bilder/royals/ (charles, anne, camilla, harry, naruhito, masako, aiko, maxima, letizia,
    silvia als .jpg, von Wikimedia Commons). Fehlt ein Foto, wird die Frage automatisch weggelassen.
    Quellenangabe je Foto steht in config.js (quelle) und erscheint unter dem Foto sowie auf site/bildnachweis.html
    (verlinkt im Fuß der Startseite). Neue Fotos nur mit freier Lizenz und mit Quellenangabe einbinden.
- `site/js/config.js` : Name der beschenkten Person, Nachricht im Popup (Text, Link, Gruß), Lösung (Platz und Variante je Figur) und Quizfragen
- `site/js/motive.js` : die vier Figuren mit ihren Varianten als SVG, Hinweistexte und die Felder des 2 x 2 Rasters
- `site/js/fortschritt.js` : Speichern des Fortschritts, Zuordnung Spiel zu Motiv, Gewinn-Overlay, Konfetti
- `werkzeuge/server.ps1` : Testserver ohne Python/Node (`powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1`, dann http://localhost:8080)
  - mit `-Netz` auch im WLAN erreichbar, z. B. vom Handy unter http://192.168.178.26:8080/ (Firewall-Freigabe für private Netzwerke nötig)

Zuordnung Spiel zu Motiv: Obst-Mastermind → Baum, Royals-Quiz → Prinzessin, Schiebepuzzle → Burg, Ritter-Labyrinth → Ritter.

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
- [x] Spiele: Obst-Mastermind, Royals-Quiz, Schiebepuzzle, Ritter-Labyrinth (Geschicklichkeit)
- [x] Quizfragen: 50 Fragen zum Thema Royals (auch Japan), 10 pro Runde
- [x] Fotos für die 10 "Wer ist das?"-Fragen (Wikimedia Commons, freie Lizenzen, Nachweis auf bildnachweis.html)
- [ ] Veröffentlichen (später, voraussichtlich GitHub Pages)
