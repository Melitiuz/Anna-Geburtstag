# Projekt: Geburtstags-Spieleseite mit QR Code

## Ziel
Eine Website als Ausgangspunkt für ein Geburtstagsgeschenk.
Sie enthält 4 Minispiele. Wer ein Spiel schafft, erhält ein Viertel eines QR Codes.
Richtig zusammengesetzt führt der QR Code zu einer Zielseite mit einem Geburtstagstext
und einem Link zur Website vom Ort des Geschenks.

## Aufbau
Veröffentlicht wird nur der Ordner `site/` (siehe `netlify.toml`).
- `site/index.html` : Startseite mit Übersicht der 4 Spiele, Fortschritt und Puzzle aus den gesammelten Vierteln
- `site/spiele/` : memory.html, quiz.html, schiebepuzzle.html, kerzen.html
- `site/qr/` : die vier QR Viertel als PNG mit unauffälligen Namen (Zuordnung in `site/js/fortschritt.js`, Pfade dort base64 kodiert)
  - m3x9.png oben links, t5b2.png oben rechts, r8d1.png unten links, w2k6.png unten rechts
  - Fehlt ein Bild, zeigt die Seite automatisch einen Platzhalter
- `site/ziel/index.html` : Zielseite mit Geburtstagstext und Link zum Ort des Geschenks
- `site/js/config.js` : Name der beschenkten Person und Quizfragen
- `site/js/fortschritt.js` : Speichern des Fortschritts, Gewinn-Overlay, Konfetti
- `werkzeuge/qr-viertel.html` : erzeugt die vier Viertel (Level H, Ruhezone 4, Eckmarken mit Nummern)
- `werkzeuge/server.ps1` : lokaler Testserver ohne Python/Node (`powershell -ExecutionPolicy Bypass -File werkzeuge\server.ps1`, dann http://localhost:8080)

## Technik
- Rein statische Website: HTML, CSS und JavaScript, kein Server, keine Datenbank
- Mobile first: alle Spiele müssen per Touch auf dem Handy funktionieren
- Fortschritt im Browser speichern (localStorage, in try/catch), damit gewonnene Viertel nicht verloren gehen
- Keine externen Abhängigkeiten außer bei echtem Bedarf

## Hosting und Workflow
- Code liegt in einem **privaten** GitHub Repository
- Veröffentlichung über **Netlify**, verbunden mit dem Repository (automatisches Deploy bei jedem Push)
- Kein GitHub Pages, da das kostenlos nur mit öffentlichen Repositories geht und die QR Viertel sonst einsehbar wären

## Wichtige Regeln
- Die URL der Zielseite darf sich nach dem Erzeugen des QR Codes **nie mehr ändern**.
  Inhalte der Zielseite dürfen geändert werden, der Pfad nicht.
- Der QR Code wird erst erzeugt, wenn die endgültige URL der Zielseite feststeht.
- QR Code mit hoher Fehlerkorrektur (Level H) und ausreichend Ruhezone erzeugen.
- Die Viertel bekommen Markierungen (z. B. Eckmarken oder Nummern), damit sie korrekt zusammengesetzt werden können.
- QR Viertel nicht offensichtlich im Quellcode benennen (z. B. nicht `qr-teil-1.png` direkt im HTML sichtbar).

## Sprache und Stil
- Alle Texte auf der Website auf Deutsch
- Keine Gedankenstriche (em-dashes) in Texten
- Kein Komma vor "und"

## Offene Punkte
- [ ] Geburtstagstext
- [ ] Link zur Website vom Ort des Geschenks
- [ ] Auswahl der 4 Spiele (Ideen: Memory, Quiz, Schiebepuzzle, Reaktionsspiel)
- [ ] Name der beschenkten Person und gewünschte Gestaltung (Farben, Stil)
- [ ] Endgültige URL bzw. Netlify Adresse oder eigene Domain
