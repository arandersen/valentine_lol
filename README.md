# Valentine's Day Mini-Project 💖

A cute, romantic Valentine's Day frontend-only mini-project with a rose-gold theme.

## Features

- **Landing Page**: "Will you be my Valentine?" with a playful No button that repels from cursor/tap
- **Puzzle Challenge**: 3x3 sliding puzzle that's always solvable
- **Success Page**: Heart confetti animation and celebration

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom shadcn-style components
- **Animation**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd valentine
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3010](http://localhost:3010) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
valentine/
├── app/
│   ├── layout.tsx          # Global layout
│   ├── page.tsx            # Landing page (/)
│   ├── puzzle/
│   │   └── page.tsx        # Puzzle page (/puzzle)
│   ├── success/
│   │   └── page.tsx        # Success page (/success)
│   └── globals.css         # Global styles + CSS variables
├── components/
│   ├── ui/                 # UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── ProgressIndicator.tsx
│   ├── SoundToggle.tsx
│   ├── ConfettiHearts.tsx
│   └── PuzzleGrid.tsx
├── lib/
│   ├── sound.ts            # Sound helpers + localStorage
│   ├── puzzle.ts           # Shuffle + win check helpers
│   └── utils.ts            # General utilities
├── public/
│   ├── valentine.png       # Landing page image (placeholder)
│   ├── puzzle-image.jpg    # Puzzle image (placeholder)
│   ├── meme.gif            # Success page gif (placeholder)
│   └── sounds/
│       ├── pop.mp3         # No button escape sound (placeholder)
│       ├── click.mp3       # Tile move sound (placeholder)
│       └── success.mp3     # Success chime (placeholder)
├── tailwind.config.ts
├── package.json
└── README.md
```

## Asset Replacement

The project uses placeholder assets. Replace them with your own:

1. **Landing Page Image**: Replace `/public/valentine.png`
   - Recommended size: 400x400px
   - A cute Valentine's themed image

2. **Puzzle Image**: Replace `/public/puzzle-image.jpg`
   - Recommended size: 600x600px (will be sliced into 3x3 grid)
   - A romantic photo or image

3. **Success Meme**: Replace `/public/meme.gif`
   - Any size (will be displayed at 256x256px)
   - A funny/cute Valentine's meme

4. **Sound Effects**: Replace files in `/public/sounds/`
   - `pop.mp3`: Short "boop" sound for No button escape
   - `click.mp3`: Tiny click sound for puzzle tile moves
   - `success.mp3`: Cute chime for puzzle completion

## Features

### No Button Repel
The No button "repels" away from the cursor/tap like same-pole magnets, making it effectively impossible to click. It:
- Detects pointer proximity within 100px radius
- Moves smoothly to a new position away from the pointer
- Stays within card bounds
- Never overlaps the Yes button
- Shows a playful "hehe nope 😝" tooltip

### Puzzle
- 3x3 sliding puzzle with 8 tiles + 1 empty space
- Only tiles adjacent to the empty space can move
- Always solvable (shuffled using random valid moves from solved state)
- Move counter and reset button
- Win detection with celebration

### Heart Confetti
- Canvas-based animation for performance
- Heart-shaped particles in rose-gold colors
- 3-second animation duration
- Respects `prefers-reduced-motion`

### Sound Toggle
- Default OFF
- Persists preference in localStorage
- Toggle button in top-right corner
- Sounds only play after user interaction (browser requirement)

### Progress Indicator
- Shows current step (1 of 3, 2 of 3, 3 of 3)
- Visual feedback for completed steps
- Present on all pages

## Rose-Gold Theme

The project uses a romantic rose-gold color palette:

- **Background**: #FFF7FA (soft blush)
- **Card**: #FFFFFF (white)
- **Primary**: #E8A0B8 (rose-gold)
- **Primary Deep**: #C97C98 (deeper rose)
- **Accent Gold**: #D8B07A (gold accent)
- **Text**: #3B2B34 (dark purple-brown)

## Accessibility

- Keyboard navigation support
- Focus states on all interactive elements
- Respects `prefers-reduced-motion`
- ARIA labels for buttons
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Test Checklist

- [ ] Rose-gold cute theme across all pages
- [ ] Progress indicator shows correct step on each page
- [ ] Sound toggle works, default OFF, persists preference
- [ ] No button repels pointer/tap and stays within bounds, never overlaps Yes
- [ ] Yes navigates to /puzzle
- [ ] Puzzle is 3x3 sliding puzzle with 1 empty slot, only adjacent moves
- [ ] Shuffle always solvable using random valid moves from solved
- [ ] Win detection triggers toast and navigates to /success
- [ ] Success page shows headline + meme gif + heart confetti
- [ ] Reduced motion disables heavy animations
- [ ] Works on desktop + mobile

## License

MIT License - Feel free to use for your own Valentine's surprise! 💖
