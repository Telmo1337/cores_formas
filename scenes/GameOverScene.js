class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const { width, height } = this.sys.game.canvas;

        this.add.text(width / 2, height / 2 - 50, 'Parabéns! Ganhou!', {
            fontSize: '48px',
            color: '#008000',
            fontFamily: 'Arial',
        }).setOrigin(0.5);

        const restartButton = this.add.text(width / 2, height / 2 + 50, 'Jogar Novamente', {
            fontSize: '32px',
            backgroundColor: '#0a84ff',
            color: '#fff',
            padding: { x: 20, y: 10 },
            fontFamily: 'Arial',
            borderRadius: 5,
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}
