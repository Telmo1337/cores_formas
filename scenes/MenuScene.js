class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.add.text(300, 250, 'Cores e Formas', { fontSize: '32px', fill: '#fff' });
        const startText = this.add.text(340, 320, 'Começar', { fontSize: '24px', fill: '#0f0' });

        startText.setInteractive();
        startText.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}