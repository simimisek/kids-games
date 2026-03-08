# 🎓 Vzdělávací hry pro děti

Sbírka malých vzdělávacích her pro děti v prohlížeči. Každá hra je jeden HTML soubor — bez závislostí, bez buildu.

Hry jsou v češtině.

## 🎮 Demo

> Bude doplněno po nasazení na GitHub Pages.

---

## 🗂️ Struktura projektu

```
/
├── index.html          # Hlavní menu
├── hra.html            # Sčítání a odčítání do 20
├── hra2.html           # Vyber správný výsledek do 30
├── hra3.html           # Slabiková hra
├── hra4.html           # Osmisměrka
├── hra5.html           # Doplň písmeno
├── hra6.html           # Kde je víc bonbonků?
├── hra7.html           # Počítej se zvířátky
├── hra8.html           # Pyramida čísel
├── README.md
└── CLAUDE.md           # Pravidla vývoje pro Claude Code
```

---

## 🎲 Přehled her

### 🔢 Matematika

| Soubor | Název | Popis |
|--------|-------|-------|
| hra.html | Sčítání a odčítání do 20 | Klasické příklady i chybějící čísla |
| hra2.html | Vyber správný výsledek do 30 | Najdi správně vypočítaný příklad ze tří možností |
| hra8.html | Pyramida čísel | Doplň pyramidu — každá kostka je součet dvou pod ní |

### 📖 Čeština

| Soubor | Název | Popis |
|--------|-------|-------|
| hra3.html | Slabiková hra | Spoj slabiky v bublinkách do slov |
| hra4.html | Osmisměrka | Najdi skrytá slova v mřížce písmen |
| hra5.html | Doplň písmeno | Ve slově chybí jedno písmeno — vyber správné |

### 🌈 Hrátky pro nejmenší

| Soubor | Název | Popis |
|--------|-------|-------|
| hra6.html | Kde je víc bonbonků? | Vyber políčko s více bonbonky (do 10) |
| hra7.html | Počítej se zvířátky | Sčítání a odčítání do 5 pomocí skupinek zvířátek |

---

## 🏆 Žebříček

Výsledky všech hráčů se ukládají do sdílené Firebase Realtime Database — hráči se mohou srovnávat napříč zařízeními.

---

## 🚀 Spuštění lokálně

Žádný build, žádné závislosti. Stačí otevřít `index.html` v prohlížeči, nebo spustit lokální server:

```bash
npx serve .
# nebo
python -m http.server 8080
```

---

## 🌍 Nasazení zdarma — GitHub Pages

1. Nahraj repozitář na GitHub
2. Jdi do **Settings → Pages**
3. Zdroj: **Deploy from branch → main → / (root)**
4. Web bude dostupný na `https://<uzivatel>.github.io/<repozitar>/`

---

## 📋 Pravidla projektu

- Hry jsou jednoduché a přehledné.
- Kód je čitelný a srozumitelný.
- Neměň strukturu projektu bez důvodu.
- Každá hra je ve vlastním souboru.
- Preferuj malé soubory a jednoduchou logiku.

Podrobná pravidla designu a implementace viz [CLAUDE.md](./CLAUDE.md).

---

## 🛠️ Technologie

- HTML5, CSS3, JavaScript (ES6+)
- Žádné frameworky, žádné závislosti
- Firebase Realtime Database (sdílený žebříček)
