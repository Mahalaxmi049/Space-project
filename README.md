# The Last Signal 🌌

A narrative-driven, interactive space education experience that teaches children about Pulsar Stars.

## Live Demo
https://space-project-hxxno86cc-mahalaxmi049s-projects.vercel.app

## The Story
You receive a mysterious radio signal from 1,000 light-years away. As you investigate, you discover it's coming from a Pulsar — a rapidly spinning neutron star. Your mission: tune into its frequency, decode its rhythm, and make contact.

## Features
- 🎭 **Personalised onboarding** — Enter your name and choose a scientist class (Radio Astronomer / Physicist / Explorer)
- 🌌 **Atmospheric hook** — Animated starfield with pulsing signal wave
- 🔵 **3D Interactive Pulsar** — Real-time spinning pulsar built with React Three Fiber + frequency slider to "lock on"
- 🎮 **Personalised mini-games** per scientist class:
  - Radio Astronomer → Rhythm tap game
  - Physicist → Science quiz
  - Explorer → Space navigation
- 🏆 **Decoded screen** — Personalised mission complete screen

## Tech Stack
- React + TypeScript
- Framer Motion (animations)
- React Three Fiber + Three.js (3D pulsar)
- Context API (state management)
- Vite + Vercel

## Design Decisions
- Chose Pulsar Stars as the topic — unique, mysterious, perfect for a narrative experience
- Each scientist class gets a different mini-game for true personalisation
- Dark space aesthetic with gradient backgrounds and animated particles

## Trade-offs
- Used inline styles as fallback due to Tailwind v4 PostCSS compatibility issue
- AI personalisation was planned but deprioritised to complete all core stages in time