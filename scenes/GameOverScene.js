class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    //recebe dados da cena anterior
    //como se ganhou ou perdeu e a pontuação final
    //se não houver dados, assume que perdeu e pontuação é 0
    //se houver dados, assume que ganhou e mostra a pontuação final
    init(data) {
        this.win = data.win || false;
        this.finalScore = data.score || 0;
    }

    create() {
        //imagem de fundo
        this.add.image(400, 300, 'menuBg').setDisplaySize(800, 600);

        //toca a musica de gameover se não houver vitória
        if (!this.win) {
            this.gameOverMusic = this.sound.add('gameOverMusic', {
                loop: false, volume: 2
            });
            this.gameOverMusic.play();
        }

        const finalScore = this.finalScore;

        //mensagem de vitoria ou derrota (usar if ternary)
        this.add.text(400, 220, this.win ? 'Parabéns! Ganhou!' : 'Tempo esgotado! Perdeu!', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        //motrar a pontuacao final
        this.add.text(400, 270, `Pontuação final: ${finalScore}`, {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        //mensagem para voltar ao menu
        this.add.text(400, 320, 'Clique para voltar ao menu', {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        }).setOrigin(0.5);

        //ao clicar, para a musica(se estiver a tocar) e limpa a pontuação e volta ao menu
        this.input.once('pointerdown', () => {
            if (this.gameOverMusic) this.gameOverMusic.stop();
            this.registry.set('score', 0);
            this.scene.start('MenuScene');
        });
    }
}
