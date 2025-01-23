# Vite P5 Sound and MIDI Starter Kit

A minimal starter kit for creating animated audio sketches with p5.sound.js and Tone.js Midi.

## Demo

View the demo: [https://labcat.github.io/vite-p5-sound-and-midi-starter-kit/](https://labcat.github.io/vite-p5-sound-and-midi-starter-kit/)

Demo code available at: [`src/demos/CirclesSketch.js`](https://github.com/LABCAT/vite-p5-sound-and-midi-starter-kit/blob/main/src/demos/CirclesSketch.js)

## Requirements

- Node.js 22
- pnpm (`npm install -g pnpm`)

## Setup

```bash
# Clone repository and remove git
git clone https://github.com/LABCAT/vite-p5-sound-and-midi-starter-kit.git
cd vite-p5-sound-and-midi-starter-kit
rm .git -rf
# Use correct Node version
nvm use
# Install dependencies
pnpm install
# Start development server
pnpm dev
# Build for production
pnpm build
# Preview production build
pnpm preview
# Deploy to GitHub Pages
pnpm deploy
```

## Getting Started

1. Create a copy of the AudioSketchTemplate:

```bash
cp src/AudioSketchTemplate.js src/MySketch.js
```

2. Follow the comments in `AudioSketchTemplate.js` to configure your audio/MIDI files.

3. Update src/main.js:

```javascript
import MySketch from "./MySketch";
new p5(MySketch);
```

4. Create your audio-reactive animation in MySketch.js

## License

MIT
