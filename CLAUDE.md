# Pravidla pro vzdělávací hry — Simonka/Danik

## Obecná pravidla (platí pro VŠECHNY hry)

### 1. Jméno hráče
- Jméno se **nezadává před hrou** — zadává se až **na konci hry** na obrazovce s výsledkem
- Na úvodní obrazovce není žádné pole pro jméno — pouze tlačítko Hrát
- Na konci: pole pro jméno + tlačítko "Uložit a pokračovat" (nebo podobné), pak se zapíše do žebříčku

### 2. Responzivita
- Vše musí fungovat na mobilním telefonu (min. šířka 360px)
- `overflow-x: hidden` na body (NIKDY `overflow: hidden` — blokuje scrollování)
- Média query: `@media (max-width: 400px)` — zmenšit fonty, padding, prvky
- Tlačítka a interaktivní prvky min. 44×44px (touch target)
- Žádný fixed layout se šířkami v px bez fallbacku

### 3. Design
- **Žádné křiklavé barvy** — pěkný, přehledný, klidný design
- Doporučené pozadí: tmavý gradient (příklady níže)
- Text musí být dobře čitelný — dostatečný kontrast (bílý text na tmavém pozadí)
- Zaoblené rohy (border-radius 12–20px), jemné stíny
- Animace jemné, ne přehnaně blikající

#### Osvědčené barevné schéma pozadí:
```css
/* Matematika */
background: linear-gradient(135deg, #1a237e 0%, #0277bd 100%); /* modrá */
/* Čeština */
background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%); /* zelená */
/* Hrátky pro nejmenší */
background: linear-gradient(135deg, #4a148c 0%, #880e4f 100%); /* fialová */
```

### 4. Chybná odpověď
- Při špatné odpovědi se **nabídne nový příklad** (nová otázka)
- Skóre se **nezmění** (chyba se nepočítá)
- Počet příkladů potřebných ke splnění kola se nemění
- Krátká vizuální zpětná vazba (červené záblesk ~500ms), pak nový příklad

### 5. Časomíra
- **Pouze celkový čas** — měří se jak dlouho hráč prochází celou hrou
- Žádný odpočet na příklad ani na kolo (stresuje dítě)
- Zobrazení formátu: `M:SS` (např. `1:34`)

### 6. Žebříček
- Zobrazuje se na **úvodní obrazovce** (top 10 nejlepších časů) a na **konci hry**
- Ukládá se do **Firebase Realtime Database** — sdílený žebříček pro všechny hráče
- `DB_URL = 'https://kids-games-3a167-default-rtdb.europe-west1.firebasedatabase.app'`
- Cesta: `/scores/<QUIZ_TYPE>.json`
- Max 10 záznamů, seřazeno od nejlepšího (nejkratší) času
- Formát záznamu: `{ name, ms, date }`
- Funkce `getScores()`, `saveScore()`, `renderLeaderboard()` jsou vždy **async**
- Při výpadku internetu `getScores()` vrátí prázdné pole (tichý fallback)

### 7. Struktura každé hry
```
Úvodní obrazovka → Herní obrazovka → Konečná obrazovka
```
- **Úvod**: ikona, název, popis, žebříček (top 5), tlačítko **Hrát ▶**
  - ⚠️ Žádné pole pro jméno na úvodní obrazovce
- **Hra**: progress indikátor, časomíra, herní obsah
- **Konec** (vše viditelné najednou, žádné skryté prvky):
  1. Výsledný čas
  2. Pole pro jméno + tlačítko **Uložit** (po kliknutí uloží a obnoví žebříček)
  3. Žebříček (zobrazí se hned, aktualizuje se po uložení)
  4. Tlačítko **Hrát znovu**
  5. Odkaz **← Rozcestník**

### 8. Technické detaily
- Každá hra = jeden soubor `.html` (CSS + JS inline)
- QUIZ_TYPE: unikátní string, např. `'math-pyramid'`, `'czech-letters'`
- `localStorage` klíč: `'scores_' + QUIZ_TYPE`
- Funkce vždy přítomné: `getScores()`, `saveScore(name, ms)`, `renderLeaderboard(el)`, `fmtTime(ms)`, `esc(s)`

### 9. Google Analytics
- Každý nový `.html` soubor musí obsahovat Google Analytics tag hned za `<head>`
- Measurement ID: `G-KEF2T80GE0`
```html
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KEF2T80GE0"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-KEF2T80GE0');
  </script>
```

## Přehled existujících her

| Soubor | Název | Sekce | QUIZ_TYPE |
|--------|-------|-------|-----------|
| hra.html | Sčítání a odčítání do 20 | Matematika | `math-basic` |
| hra2.html | Vyber správný výsledek do 30 | Matematika | `math-choice` |
| hra3.html | Slabiková hra | Čeština | `czech-syllables` |
| hra4.html | Osmisměrka | Čeština | `czech-wordsearch` |
| hra5.html | Doplň písmeno | Čeština | `czech-letters` |
| hra6.html | Kde je víc bonbonků? | Hrátky pro nejmenší | `preschool-candies` |
| hra7.html | Počítej se zvířátky | Hrátky pro nejmenší | `preschool-animals` |
| hra8.html | Pyramida čísel | Matematika | `math-pyramid` |
| hra9.html | Had čísel | Matematika | `math-snake` |
| hra10.html | Spoj tečky | Hrátky pro nejmenší | `preschool-dots` |

## Sekce v index.html
- 🔢 **Matematika** — hra.html, hra2.html, hra8.html, hra9.html
- 📖 **Čeština** — hra3.html, hra4.html, hra5.html
- 🌈 **Hrátky pro nejmenší** — hra6.html, hra7.html, hra10.html
