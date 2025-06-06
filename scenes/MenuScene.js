class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.5 });
        this.menuMusic.play();

        // Botão ou clique para começar o jogo
        this.input.once('pointerdown', () => {
            this.menuMusic.stop(); // parar a música do menu
            this.scene.start('GameScene'); // ou o nome da sua cena inicial de jogo
        });



        this.registry.set('score', 0); // Resetar pontuação ao iniciar

        this.add.text(400, 250, 'Cores e Formas', { 
            fontSize: '32px', 
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        
        }).setOrigin(0.5);
        this.add.text(400, 320, 'Clique para começar', { 
            fontSize: '20px', 
            fill: '#FFFFFF', 
            fontFamily: 'Roboto' 
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('GameScene', { level: 1 });
        });
    }
}
