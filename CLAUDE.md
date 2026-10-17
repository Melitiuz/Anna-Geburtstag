# Projekt: Geburtstags-Spieleseite

## Ziel
Eine Website als Ausgangspunkt für ein Geburtstagsgeschenk.
Sie enthält 4 Minispiele. Jedes gewonnene Spiel schaltet ein Motiv frei
(Ritter auf Pferd, Baum, Prinzessin mit Krone, Burg).
Die Motive werden per Drag and Drop an ihre Plätze in einem fertigen Bild gezogen.
Sind alle vier richtig angeordnet, erscheint nach "Bestätigen" ein Popup mit der Nachricht zum Geschenk.

## Aufbau
Veröffentlicht wird nur der Ordner `site/` (siehe `.github/workflows/pages.yml`).
- `site/index.html` : Startseite mit Übersicht der 4 Spiele, Fortschritt, Bild mit Zielplätzen, Ablage der Motive und Prüfen
- `site/spiele/` : memory.html, quiz.html, schiebepuzzle.html, labyrinth.html
- `site/js/config.js` : Name der beschenkten Person, Nachricht im Popup (Text, Link, Gruß) und Quizfragen
- `site/js/motive.js` : die vier Motive und das Hintergrundbild als SVG, dazu die Zielplätze (Raster 400 x 300)
- `site/js/fortschritt.js` : Speichern des Fortschritts, Zuordnung Spiel zu Motiv, Gewinn-Overlay, Konfetti
- `werkzeuge/server.ps1` : lokaler Testserver ohne Python/Node (`powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1`, dann http://localhost:8080)

Zuordnung Spiel zu Motiv: Memory → Baum, Quiz → Prinzessin, Schiebepuzzle → Burg, Ritter-Labyrinth → Ritter.

## Technik
- Rein statische Website: HTML, CSS und JavaScript, kein Server, keine Datenbank
- Mobile first: alle Spiele und das Drag and Drop müssen per Touch auf dem Handy funktionieren (Pointer Events, nicht HTML5 Drag and Drop)
- Fortschritt im Browser speichern (localStorage, in try/catch), damit freigeschaltete Motive nicht verloren gehen
- Keine externen Abhängigkeiten außer bei echtem Bedarf

## Hosting und Workflow
- Code liegt im GitHub Repository https://github.com/Melitiuz/Anna-Geburtstag (derzeit privat, soll später öffentlich werden)
- Commits mit Autor `Melitiuz <Melitiuz@users.noreply.github.com>` (im Repository eingestellt)
- Hosting über GitHub Pages: `.github/workflows/pages.yml` veröffentlicht bei jedem Push auf main den Ordner `site/`
  - Adresse: https://melitiuz.github.io/Anna-Geburtstag/
  - Voraussetzung: Repository öffentlich, unter Settings → Pages als Quelle "GitHub Actions" gewählt

## Sprache und Stil
- Alle Texte auf der Website auf Deutsch
- Keine Gedankenstriche (em-dashes) in Texten
- Kein Komma vor "und"

## Offene Punkte
- [x] Name der beschenkten Person: Anna
- [x] Geschenk-Link: https://www.bodaborg.de/bochum/
- [ ] Nachricht zum Geschenk (Text folgt)
- [x] Spiele: Quiz, Ritter-Labyrinth (Geschicklichkeit), Memory, Schiebepuzzle
- [ ] Quizfragen über Anna
- [x] Hosting: GitHub Pages
