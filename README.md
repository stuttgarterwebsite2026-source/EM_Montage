# EM Montage & Dienstleistungen – Website

Professionelle, zweisprachige (DE/EN) One-Page-Website für ein Handwerks- und
Dienstleistungsunternehmen in Senden & Umgebung.

## ✨ Funktionen

- **One-Page-Aufbau:** Start (Hero), Leistungen, Über uns, Kontakt, Footer
- **Zweisprachig (DE/EN)** über einen Toggle in der Navbar – schaltet die
  **gesamte** Seite sofort um (ohne Neuladen). Die Wahl wird im `localStorage`
  gespeichert und bleibt beim erneuten Besuch erhalten.
- **5 Leistungs-Karten** mit Icons und Beschreibung
- **„Warum wir"**-Abschnitt mit Vertrauenspunkten
- **Kontaktbereich** mit Telefon, WhatsApp, E-Mail, Einzugsgebiet und
  Kontaktformular (öffnet das E-Mail-Programm per `mailto:`)
- **DSGVO-freundliches Cookie-Banner** (Akzeptieren / Ablehnen, Auswahl
  gespeichert in `localStorage`)
- **Impressum** (§5 TMG) und **Datenschutzerklärung** (DSGVO) – beide
  zweisprachig, mit Platzhaltern zum Nachtragen
- **Responsive / Mobile-First**, dezente Animationen, Farbwelt aus dem Logo
  (Blau `#1a4f91`, Schwarz/Weiß)

## 📂 Ordnerstruktur

```
EM_Montage/
├── index.html            # Startseite (One-Pager)
├── impressum.html        # Impressum (§5 TMG)
├── datenschutz.html      # Datenschutzerklärung (DSGVO)
├── css/
│   └── styles.css        # Gesamtes Design
├── js/
│   ├── translations.js   # ► Alle Texte (DE/EN) – hier anpassen
│   └── main.js           # Sprachumschaltung, Cookie-Banner, Menü, Formular
├── assets/
│   └── img/
│       └── EM_logo.png   # Logo (Navbar, Footer, Favicon)
├── logo/
│   └── EM_logo.png       # Original-Logo
└── README.md
```

## 🚀 Lokal starten

Da es eine reine HTML/CSS/JS-Seite ist, gibt es **keinen Build-Schritt**.

**Variante 1 – einfach öffnen:**
`index.html` per Doppelklick im Browser öffnen.

**Variante 2 – lokaler Server (empfohlen):**
Damit alle Funktionen sauber laufen, einen kleinen Webserver starten:

```bash
# im Projektordner
cd EM_Montage

# mit Python 3
python3 -m http.server 8000
```

Dann im Browser öffnen: **http://localhost:8000**

(Alternativ in VS Code die Erweiterung „Live Server" nutzen.)

## ✏️ Texte anpassen

Alle sichtbaren Texte stehen zentral in **`js/translations.js`** – getrennt nach
`de` (Deutsch) und `en` (Englisch). Einfach den Text rechts vom Doppelpunkt
ändern, speichern, Seite neu laden.

## 📝 Noch nachzutragen (Platzhalter)

In **`js/translations.js`** unter den Schlüsseln `imprint.*` und
`privacy.responsibleBody` die folgenden Platzhalter ersetzen – in **beiden**
Sprachen (`de` und `en`):

- `[VOLLSTÄNDIGER NAME]` / `[FULL NAME]`
- `[STRASSE & HAUSNUMMER]` / `[STREET & NUMBER]`
- `[PLZ ORT]` / `[POSTAL CODE CITY]`
- ggf. `[USt-IdNr., falls vorhanden]` / `[VAT ID, if available]`

Telefon (`0152 08612664`) und E-Mail (`montage.service.em@gmail.com`) sind
bereits überall eingetragen.

## 🖼️ Bilder

Alle Bilder liegen **lokal** im Ordner `assets/img/` (lizenzfreie
Handwerks-Fotos, lokal gespeichert – keine externen Hotlinks, DSGVO-freundlich,
funktioniert offline).

### Eigene Fotos einbauen (am einfachsten)

Lege deine echten Baustellen-/Arbeitsfotos einfach mit **demselben Dateinamen**
in `assets/img/` ab – dann musst du **keinen Code anfassen**:

| Datei                         | wird verwendet für …                          |
| ----------------------------- | --------------------------------------------- |
| `hero.jpg`                    | großes Hintergrundbild im Kopfbereich (Hero)  |
| `about.jpg`                   | Bild im Abschnitt „Über uns"                   |
| `service-tueren.jpg`          | Karte „Montage von Türen, Fenstern & Zäunen"  |
| `service-schweissen.jpg`      | Karte „Schweißarbeiten"                        |
| `service-kueche.jpg`          | Karte „Möbel- & Küchenmontage"                 |
| `service-reparatur.jpg`       | Karte „Reparaturarbeiten"                      |
| `service-hausmeister.jpg`     | Karte „Hausmeisterservice"                     |

**Empfohlene Bildgrößen:** Hero ca. 1600×1000 px, die übrigen ca. 800×550 px,
als `.jpg`. Nach dem Austausch ggf. den Browser-Cache leeren (Strg/Cmd + Shift + R).

Falls du andere Dateinamen verwenden möchtest, die Pfade in `index.html`
(`<img src="assets/img/…">`) bzw. für das Hero-Bild in `css/styles.css`
(`.hero { background: … url("../assets/img/hero.jpg") … }`) anpassen.

## ⚖️ Rechtlicher Hinweis

Impressum und Datenschutzerklärung enthalten Standardtexte mit Platzhaltern.
Bitte vor Veröffentlichung die Angaben vervollständigen und im Zweifel
rechtlich prüfen lassen.
