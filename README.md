# hex.coach — 6D Cognitive & Science Combat Arena

> **Fully Decoupled · Hardcore Quiz Engine · Real-time PvP-grade Experience**

## Overview

hex.coach is a pure front-end quiz combat system centered around **6 scientific dimensions**. All data and logic run entirely in the browser — no backend required.

### The Six Dimensions

| Dimension | Coverage | Questions |
|-----------|----------|-----------|
| 🌊 DEEP SEA | Oceanography, deep-sea biology, extreme physics | 15 |
| ⭐ COSMOS | Astronomy, black holes, relativity, space exploration | 15 |
| 🏆 WORLD RECORDS | Geographic, biological & physical extreme records | 15 |
| 🏛️ ANCIENT CIV | Sumer, Egypt, Maya, Troy, Qin Dynasty | 15 |
| 🧠 IQ MATRIX | Number sequences, logic, pattern recognition, spatial reasoning | 15 |
| 🤖 AI CORE | Neural networks, Transformers, AI alignment, Nobel Prize | 15 |

A total of **90 expert-level single-choice questions**, with **18 randomly selected per session** (3 per dimension).

## Tech Stack

- **HTML5** + **CSS3** (Pure CSS animations & layout)
- **Tailwind CSS** (CDN-loaded utility-first styling)
- **Vanilla JavaScript** (ES2020+, zero dependencies)
- **JSON** static question bank (`quiz_data.json`)

## Project Structure

```
hex_Quiz/
├── index.html                 # Single-page application entry
├── quiz_data.json             # Static question bank (6 × 15 questions)
├── dimension_interpretations.json  # Dimension result interpretations
└── README.md                  # This file
```

## Core Features

1. **Smart Quiz Assembly** — 3 random questions per dimension, globally shuffled, ensuring a unique test every time
2. **15-Second Countdown** — Dynamic progress bar turns red below 35%, auto-grades as incorrect on timeout
3. **Instant Feedback** — Click to reveal correct/wrong (green=correct, red=wrong) with hardcore cold-knowledge explanations
4. **Cold-Knowledge Explanations** — Every question includes a ~100-character hard-science explanation, learnable regardless of answering correctly
5. **Dimensional Scoring** — Results page breaks down accuracy per dimension, pinpointing knowledge gaps
6. **Share Card** — Generate and share a stylish screenshot card with rank, radar chart, and a golden quote

## How to Run

Simply open `index.html` in your browser (requires internet for Tailwind CSS CDN):

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Or use a local server (recommended for best experience):

```bash
# Python 3
python -m http.server 8000
# Then open http://localhost:8000

# Node.js
npx serve .
```

## Extension Guide

### Adding Questions

Edit `quiz_data.json` and add a new entry to the `questions` array of the relevant dimension:

```json
{
  "id": "dimension_06",
  "question": "Question text here",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": 0,
  "explanation": "Hard-science explanation within 100 characters"
}
```

### Adding a New Dimension

Add a new object to the `dimensions` array in `quiz_data.json` with 5+ questions — it will be automatically picked up.

### Adjusting Timer

Edit the `duration` variable in the `startTimer` function inside `index.html` (value in milliseconds).

## License

MIT © hex.coach
