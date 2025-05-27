class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.sys.game.canvas;

        this.add.text(width / 2, height / 2 - 50, 'Cores e Formas', {
            fontSize: '48px',
            color: '#000',
            fontFamily: 'Arial',
        }).setOrigin(0.5);

        const playButton = this.add.text(width / 2, height / 2 + 50, 'Jogar', {
            fontSize: '32px',
            backgroundColor: '#0a84ff',
            color: '#fff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            borderRadius: 5,
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
