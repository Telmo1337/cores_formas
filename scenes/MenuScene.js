class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Fundo
        this.add.image(400, 300, 'menuBg').setDisplaySize(800, 600);

        // Música do menu
        this.menuMusic = this.sound.add('menuMusic', { loop: true, volume: 0.5 });
        this.menuMusic.play();

        // Título
        this.add.text(400, 150, 'Cores e Formas', {
            fontSize: '48px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Botão "Começar o jogo"
        const startButton = this.add.text(400, 300, 'Começar o jogo', {
            fontSize: '32px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        startButton.on('pointerdown', () => {
            this.menuMusic.stop();
            this.scene.start('GameScene', { level: 1 });
        });

        // Botão "Regras"
        const rulesButton = this.add.text(400, 380, 'Regras', {
            fontSize: '28px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        rulesButton.on('pointerdown', () => {
            this.showRules();
        });
    }

    showRules() {
        if (this.rulesText) {
            this.rulesText.destroy();
        }

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
