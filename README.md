# README für Projekt 1: Webanwendung zur bidirektionalen Bewertung von Unternehmensakteuren

Dies ist die README-Datei für das Studienprojekt im Modul "Angewandte Informatik" an der Hochschule Wismar. Das Projekt, bekannt als "Projekt 1", umfasst die Entwicklung einer Webanwendung zur bidirektionalen Bewertung von Unternehmensakteuren. Diese Anwendung wird über npm ausgeführt und zielt darauf ab, eine Plattform bereitzustellen, auf der sowohl Mitarbeiter als auch Unternehmen Feedback austauschen können.

## Projektübersicht

Das Ziel des Projekts ist es, eine Softwarelösung zu entwickeln, die es Unternehmen ermöglicht, die Leistung ihrer Mitarbeiter objektiv zu bewerten und gleichzeitig subjektives Feedback der Mitarbeiter zu Unternehmenskultur, Arbeitsbedingungen und Führung zu erfassen. Die Anwendung soll umfassende Bewertungen ermöglichen, die zur Identifizierung von Stärken und Schwächen des Unternehmens beitragen und gezielte Entwicklungsmaßnahmen unterstützen.

## Technologien

Die Anwendung wird mit folgenden Technologien entwickelt und betrieben:

- **npm**: Als Paketmanager zur Verwaltung von Abhängigkeiten und zur Ausführung der Anwendung.
- **JavaScript/Node.js**: Die Hauptprogrammiersprache und Laufzeitumgebung für die Backend-Entwicklung.
- **MongoDB**: Eine NoSQL-Datenbank für die Speicherung von Benutzer- und Abteilungsdaten sowie Bewertungen.
- **Next.js**: Ein React-Framework für die Entwicklung von Webanwendungen, das Modularität und einfache Wartung ermöglicht.

## Installation

Um das Projekt lokal auszuführen, führen Sie folgende Schritte aus:

1. **Repository klonen**:

```bash
git clone https://github.com/sHarpCSX/projectone.git
cd projectone
```

2. **Abhängigkeiten installieren**:

   Führen Sie den folgenden Befehl aus, um alle erforderlichen Pakete zu installieren:

```bash
npm install
```

3. **Anwendung starten**:

   Nach der Installation der Abhängigkeiten können Sie die Anwendung starten:

```bash
npm start
```

Die Anwendung wird unter http://localhost:3000 gestartet.

Autor:
Marco Berg - Student

Vielen Dank für Ihr Interesse an meinem Projekt!

PS: Bitte beachten !!!
- es ist notwendig, im app-Verzeichnis eine eigene .env-Datei zu erstellen. Diese könnte wie folgt aussehen:
  
"DATABASE_URI=mongodb+srv://user:password@cluster0.wqmjt60.mongodb.net/hiveDB?retryWrites=true&w=majority
AUTH_SECRET=herecomesakey
AUTH_URL=http://localhost:3000/api/auth"

- es findet ein Authentifizierungsprozess statt. Dieser muss (bis zur abschließenden Präsentation) im Code manuell unterbrochen werden.
