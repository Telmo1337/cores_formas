class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.win = data.win || false;
        this.finalScore = data.score || 0;
    }

    create() {
        this.add.text(400, 220, this.win ? 'Parabéns! Você venceu!' : 'Tempo esgotado!', {
            fontSize: '32px',
            fill: '#000000',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.add.text(400, 270, `Pontuação final: ${this.finalScore}`, {
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
            this.scene.start('MenuScene');
        });
    }
}
