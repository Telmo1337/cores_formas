class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        this.add.text(400, 300, 'Parabéns!\nJogo terminado.', { fontSize: '48px', color: '#008000', align: 'center' })
            .setOrigin(0.5);

        this.add.text(400, 400, 'Clique para voltar ao menu', { fontSize: '24px', color: '#000' })
            .setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
