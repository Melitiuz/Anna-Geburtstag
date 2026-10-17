# Projekt: Geburtstags-Spieleseite

## Ziel
Eine Website als Ausgangspunkt für ein Geburtstagsgeschenk.
Sie enthält 4 Minispiele. Jedes gewonnene Spiel schaltet ein Motiv frei
(Ritter auf Pferd, Baum, Prinzessin mit Krone, Burg).
Die Motive werden per Drag and Drop an ihre Plätze in einem fertigen Bild gezogen.
Sind alle vier richtig angeordnet, erscheint nach "Bestätigen" ein Popup mit der Nachricht zum Geschenk.

## Aufbau
Veröffentlicht wird nur der Ordner `site/` (siehe `netlify.toml`).
- `site/index.html` : Startseite mit Übersicht der 4 Spiele, Fortschritt, Bild mit Zielplätzen, Ablage der Motive und Prüfen
- `site/spiele/` : memory.html, quiz.html, schiebepuzzle.html, kerzen.html
- `site/js/config.js` : Name der beschenkten Person, Nachricht im Popup (Text, Link, Gruß) und Quizfragen
- `site/js/motive.js` : die vier Motive und das Hintergrundbild als SVG, dazu die Zielplätze (Raster 400 x 300)
- `site/js/fortschritt.js` : Speichern des Fortschritts, Zuordnung Spiel zu Motiv, Gewinn-Overlay, Konfetti
- `werkzeuge/server.ps1` : lokaler Testserver ohne Python/Node (`powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1`, dann http://localhost:8080)

Zuordnung Spiel zu Motiv: Memory → Baum, Quiz → Prinzessin, Schiebepuzzle → Burg, Kerzen auspusten → Ritter.

## Technik
- Rein statische Website: HTML, CSS und JavaScript, kein Server, keine Datenbank
- Mobile first: alle Spiele und das Drag and Drop müssen per Touch auf dem Handy funktionieren (Pointer Events, nicht HTML5 Drag and Drop)
- Fortschritt im Browser speichern (localStorage, in try/catch), damit freigeschaltete Motive nicht verloren gehen
- Keine externen Abhängigkeiten außer bei echtem Bedarf

## Hosting und Workflow
- Code liegt im GitHub Repository https://github.com/Melitiuz/Anna-Geburtstag (derzeit privat, soll später öffentlich werden)
- Commits mit Autor `Melitiuz <Melitiuz@users.noreply.github.com>` (im Repository eingestellt)
- Hosting noch offen: Netlify (`netlify.toml` vorhanden) oder GitHub Pages, sobald das Repository öffentlich ist

## Sprache und Stil
- Alle Texte auf der Website auf Deutsch
- Keine Gedankenstriche (em-dashes) in Texten
- Kein Komma vor "und"

## Offene Punkte
- [ ] Name der beschenkten Person
- [ ] Nachricht zum Geschenk und Link
- [ ] Quizfragen über die beschenkte Person
- [ ] Hosting festlegen
