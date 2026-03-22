

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
- Zobrazuje se na **úvodní obrazovce** (top 5 nejlepších časů) a na **konci hry**
- Ukládá se do **Firebase Realtime Database** (ne localStorage — funguje na všech zařízeních)
- `DB_URL = 'https://kids-games-3a167-default-rtdb.europe-west1.firebasedatabase.app'`
- Cesta: `/scores/<QUIZ_TYPE>.json`
- Max 10 záznamů, seřazeno od nejlepšího (nejkratší) času
- Formát záznamu: `{ name, ms, date }`
- Jméno je **povinné** — bez jména se skóre neuloží (červený outline + focus na input)

### 7. Struktura každé hry
```
Úvodní obrazovka → Herní obrazovka → Konečná obrazovka
```
- **Úvod**: ikona, název, popis, [žebříček], tlačítko Hrát
- **Hra**: progress indikátor, časomíra, herní obsah, **tlačítko Domů** (fixed vpravo nahoře)
- **Konec**: výsledek, pole pro jméno + uložení, žebříček, tlačítko Hrát znovu

### 8. Tlačítko Domů na herní obrazovce
Každá hra musí mít na herní obrazovce (`screen-game`) tlačítko pro návrat na hlavní stránku:

```css
/* ─── HOME BUTTON ─── */
.btn-home-fixed {
  position: fixed; top: 12px; right: 12px; z-index: 200;
  background: rgba(0,0,0,0.25); border: none; border-radius: 10px;
  padding: 7px 14px; color: #fff; font-family: inherit;
  font-size: 0.85rem; font-weight: 700; text-decoration: none; cursor: pointer;
}
.btn-home-fixed:hover { background: rgba(0,0,0,0.4); }
```

```html
<!-- Hned za opening tagem div#screen-game: -->
<a href="index.html" class="btn-home-fixed">🏠 Domů</a>
```

### 9. Technické detaily
- Každá hra = jeden soubor `.html` (CSS + JS inline)
- QUIZ_TYPE: unikátní string, např. `'math-pyramid'`, `'czech-letters'`
- Funkce vždy přítomné: `getScores()`, `saveScore()`, `renderLeaderboard(elId)`, `fmtTime(ms)`, `esc(s)`
- `getScores()` a `renderLeaderboard()` jsou **async** (Firebase fetch)

#### Povinný vzor pro žebříček (Firebase):
```js
const QUIZ_TYPE = 'moje-hra';  // unikátní pro každou hru
const DB_URL = 'https://kids-games-3a167-default-rtdb.europe-west1.firebasedatabase.app';
let finalMs = 0;

async function getScores() {
  try {
    const r = await fetch(DB_URL + '/scores/' + QUIZ_TYPE + '.json');
    const d = await r.json();
    return Array.isArray(d) ? d : [];
  } catch { return []; }
}

async function saveScore() {
  const nameInput = document.getElementById('player-name');
  const name = nameInput.value.trim();
  if (!name) { nameInput.style.outline = '3px solid #ef4444'; nameInput.focus(); return; }
  nameInput.style.outline = '';
  const scores = await getScores();
  scores.push({ name, ms: finalMs, date: new Date().toLocaleDateString('cs-CZ') });
  scores.sort((a, b) => a.ms - b.ms);
  const top10 = scores.slice(0, 10);
  try {
    await fetch(DB_URL + '/scores/' + QUIZ_TYPE + '.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(top10)
    });
  } catch {}
  renderLeaderboard('lb-end');
  nameInput.value = '';
}

async function renderLeaderboard(elId) {
  const el = document.getElementById(elId);
  el.innerHTML = '<li class="lb-empty">Načítám…</li>';
  const scores = await getScores();
  if (!scores.length) { el.innerHTML = '<li class="lb-empty">Zatím žádné výsledky.</li>'; return; }
  el.innerHTML = scores.map((s, i) => `
    <li>
      <span class="lb-rank">${i + 1}.</span>
      <span class="lb-name">${esc(s.name)}</span>
      <span class="lb-time">${fmtTime(s.ms)}</span>
    </li>`).join('');
}

function esc(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
}

// Na konci scriptu — inicializace žebříčku na start screenu:
renderLeaderboard('lb-start');
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
| hra16.html | Vymysli příklad | Matematika | `math-invent` |
| hra10.html | Spoj tečky | Hrátky pro nejmenší | `preschool-dots` |
| hra11.html | Spoj kostičky s čísly | Hrátky pro nejmenší | `preschool-blocks` |
| hra12.html | Barevná příšerka | Hrátky pro nejmenší | `preschool-monster` |
| hra17.html | Hledej číslo | Hrátky pro nejmenší | `preschool-balloons` |
| hra18.html | Závodní auto | Matematika | `math-bigger` |
| hra19.html | Kočka a myši | Matematika | `math-cat-mice` |
| hra13.html | Skládej slova | Čeština | `czech-build` |
| hra14.html | Páry písmen | Čeština | `czech-letter-pairs` |
| hra15.html | Psací páry | Čeština | `czech-cursive-pairs` |
| hra20.html | Srovnej zmrzlinky | Hrátky pro nejmenší | `preschool-icecream` |
| hra21.html | Najdi správné slovo | Čeština | `czech-find-word` |
| hra22.html | Spoj podle vzoru | Hrátky pro nejmenší | `preschool-connect-pattern` |

## Sekce v index.html
- 🔢 **Matematika** — hra.html, hra2.html, hra8.html, hra16.html, hra18.html, hra19.html
- 📖 **Čeština** — hra3.html, hra4.html, hra5.html, hra13.html, hra14.html, hra15.html, hra21.html
- 🌈 **Hrátky pro nejmenší** — hra6.html, hra7.html, hra10.html, hra11.html, hra12.html, hra17.html, hra20.html, hra22.html
