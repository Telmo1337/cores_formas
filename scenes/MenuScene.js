class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        //fundo
        this.add.image(400, 300, 'menuBg').setDisplaySize(800, 600);

        //musica do menu 
        this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.5 });
        this.menuMusic.play();

        //titulo do jogo
        this.add.text(400, 150, 'Cores e Formas', {
            fontSize: '48px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto',   
            fontStyle: 'bold'
        }).setOrigin(0.5);

        //botoes do menu
        //começar o jogo
        const startButton = this.add.text(400, 300, 'Começar o jogo', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        //evento de clique no botão de começar
        startButton.on('pointerdown', () => {
            this.menuMusic.stop();
            this.scene.start('GameScene', { level: 1 });
        });

        //regras
        const rulesButton = this.add.text(400, 380, 'Regras', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        rulesButton.on('pointerdown', () => {
            this.showRules();
        });
    }
    //função para mostrar as regras do jogo
    showRules() {
        if (this.rulesText) {
            this.rulesText.destroy();
        }
        //texto 
        this.rulesText = this.add.text(400, 500,
            'Combine todas as cartas antes do tempo acabar.\nClique nas cartas para revelar as formas.\nBoa sorte!',
            {
                fontSize: '20px',
                fill: '#FFFFFF',
                fontFamily: 'Roboto',
                align: 'center',
                wordWrap: { width: 700 }
            }
        ).setOrigin(0.5).setDepth(10).setInteractive();

        this.rulesText.on('pointerdown', () => {
            this.rulesText.destroy();
        });
    }
}
