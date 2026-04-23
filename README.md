# Gann Square of 9 Calculator (MVP)

Web app React + TypeScript + Tailwind per analisi interattiva stile Gann con:
- Square of 9 configurabile
- Wheel 360°
- Date ring (360/365/366)
- Calcolo livelli prezzo (formula radice quadrata)
- Calcolo date future/passate da angoli
- Confluence panel
- Export PNG/CSV
- Preset salvabili in localStorage

## Avvio
```bash
npm install
npm run dev
```

## Test
```bash
npm run test
```

## Architettura
- `src/components`: UI modulare (`SquareOfNineGrid`, `AngleWheel`, `DateRing`, `PriceCalculator`, `TimeCalculator`, `ConfluencePanel`, `SettingsPanel`, `ExportPanel`)
- `src/utils`: logiche matematiche pure (`squareOfNine.ts`, `calculators.ts`, `dateRing.ts`)
- `src/store`: stato globale con Zustand
- `src/types`: tipi rigorosi TypeScript
- `src/data`: mock data iniziali

## Note sulle convenzioni
La teoria Gann non è univoca: le convenzioni principali sono parametrizzate dal pannello impostazioni (spirale, dimensione griglia, angoli, modello temporale, scale factor, cicli, anchor date).

## Disclaimer
Strumento a scopo analitico/educativo. Non è consulenza finanziaria.
