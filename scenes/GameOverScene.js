class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.win = data.win || false;
        this.finalScore = data.score || 0;
    }

    create() {
        // Fundo igual ao menu
        this.add.image(400, 300, 'menuBg').setDisplaySize(800, 600);

        if (!this.win) {
            this.gameOverMusic = this.sound.add('gameOverMusic', {
                loop: false, volume: 2
            });
            this.gameOverMusic.play();
        }

        const finalScore = this.finalScore;

        this.add.text(400, 220, this.win ? 'Parabéns! Ganhou!' : 'Tempo esgotado! Perdeu!', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.add.text(400, 270, `Pontuação final: ${finalScore}`, {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.add.text(400, 320, 'Clique para voltar ao menu', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            if (this.gameOverMusic) this.gameOverMusic.stop();
            this.registry.set('score', 0);
            this.scene.start('MenuScene');
        });
    }
}
