---
name: web-game
description: >-
  Scaffolding, architecture, and deployment workflows for browser-based games
  and interactive 2D/3D web simulations using Three.js, React Three Fiber, Phaser 3, or PixiJS.
---

# Web Game & Interactive Simulation Skill

## Purpose

Provides architectural patterns, game loop mechanics, asset management, and responsive rendering procedures for browser-based 2D/3D games and interactive simulations.

## Supported Engines & Frameworks

- **Three.js & React Three Fiber (R3F)**: Complex 3D environments, camera choreographies, and WebGL shaders.
- **Phaser 3**: 2D arcade physics, sprites, tilemaps, and state-based level management.
- **PixiJS**: 2D high-performance canvas rendering.
- **HTML5 Canvas / SVG**: Lightweight interactive animations and custom UI diagrams.

## Architecture Guidelines

1. **State Isolation**: Decouple the game simulation/loop state from React rendering cycles using dedicated stores (e.g. Zustand or ref-based animation loops) to maintain 60+ FPS without re-render thrashing.
2. **Asset Pipeline**: Preload audio, textures, and 3D models with fallback placeholders and loading spinners.
3. **Viewport Responsiveness**: Ensure full-screen and proportional scaling with canvas resize listeners and aspect-ratio preservation.
4. **Input Abstraction**: Support keyboard (`ArrowKeys`, `WASD`, `Space`), mouse click/drag, and touch gestures.
5. **Clean Cleanup**: Dispose of Three.js geometries, materials, textures, and requestAnimationFrame loops on component unmount to prevent WebGL memory leaks.
