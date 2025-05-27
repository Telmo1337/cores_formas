// Card.js (ou dentro do mesmo arquivo)
class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textureKey, id) {
        super(scene, x, y);
        this.scene = scene;
        this.id = id;
        this.isFlipped = false;
        this.isMatched = false;

        this.front = scene.add.image(0, 0, textureKey).setDisplaySize(100, 100);
        this.back = scene.add.image(0, 0, 'back').setDisplaySize(100, 100);
        this.add([this.back, this.front]);

        this.front.setVisible(false); // Começa virada
        this.setSize(100, 100);
        this.setInteractive({ useHandCursor: true });
        scene.add.existing(this);

        this.on('pointerdown', () => {
            if (!this.scene.canPick || this.isFlipped || this.isMatched) return;
            this.scene.cardClicked(this);
        });
    }

    flip() {
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            duration: 150,
            onComplete: () => {
                this.isFlipped = !this.isFlipped;
                this.front.setVisible(this.isFlipped);
                this.back.setVisible(!this.isFlipped);

                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    duration: 150
                });
            }
        });
    }

    setMatched() {
        this.isMatched = true;
        this.setAlpha(0.5);
    }
}
