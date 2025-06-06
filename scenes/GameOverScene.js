class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.win = data.win || false;
        this.finalScore = data.score || 0;
    }

    create() {
        // Toca a música do game over, sem loop (ou com loop, se preferir)
        this.gameOverMusic = this.sound.add('gameOverMusic', { loop: false, volume: 2 });
        this.gameOverMusic.play();
    
        // Exibe o texto de fim de jogo (parabéns ou tempo esgotado)
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
    
        // Ao clicar, para a música e volta ao menu
        this.input.once('pointerdown', () => {
            this.gameOverMusic.stop();
            this.registry.set('score', 0);
            this.scene.start('MenuScene');
        });
    }
    


    
}
