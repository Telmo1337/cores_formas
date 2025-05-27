


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: [BootScene, MenuScene, GameScene, GameOverScene], 
};

const game = new Phaser.Game(config);
// BootScene, MenuScene, GameScene, and GameOverScene should be defined in separate files
// Ensure you have the Phaser library included in your project
// and that the scene files are properly imported at the top of this file.
// Example of how to import scenes if using ES6 modules
// import BootScene from './scenes/BootScene.js';
// import MenuScene from './scenes/MenuScene.js';
// import GameScene from './scenes/GameScene.js';
// import GameOverScene from './scenes/GameOverScene.js';