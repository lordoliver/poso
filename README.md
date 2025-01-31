# POSO - Thinking Game

POSO is a strategic thinking board game where players take turns selecting numbers on a game board, following specific movement rules to maximize their score.

## Live Demo
You can play the game online at: https://lordoliver.github.io/poso/

## Versions

### Angular (Latest)
The game has been migrated to Angular 19.1.x, featuring:
- Modern component-based architecture
- Improved type safety with TypeScript
- Comprehensive unit test coverage
- Responsive design with Tailwind CSS

### AngularJS (Legacy)
The original version was built with AngularJS 1.3.14 and can be found in the `app` directory.

## Development

### Prerequisites
- Node.js 20.x or later
- npm 10.x or later

### Setup
```bash
# For the new Angular version
cd poso-ng
npm install
npm start

# For the legacy AngularJS version
cd app
npm install
npm start
```

### Testing
```bash
cd poso-ng
npm test
```

## Game Rules
1. Players take turns selecting numbers on the board
2. Movement is restricted to horizontal or vertical directions
3. Players accumulate points based on the numbers they select
4. The game ends when no valid moves remain
5. The player with the highest score wins
