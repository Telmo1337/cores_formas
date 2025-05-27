class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.win = data.win || false;
    }

    create() {
        const finalScore = this.registry.get('score') || 0;

        this.add.text(400, 220, this.win ? 'Parabéns! Você venceu!' : 'Tempo esgotado!', {
            fontSize: '32px',
            fill: '#000000',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.add.text(400, 270, `Pontuação final: ${finalScore}`, {
            fontSize: '28px',
            fill: '#000000',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.add.text(400, 320, 'Clique para voltar ao menu', {
            fontSize: '20px',
            fill: '#000000',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.registry.set('score', 0);
            this.scene.start('MenuScene');
        });
    }
}
