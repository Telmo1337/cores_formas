class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, textureKey, id, size = 70) {
        super(scene, x, y);

        this.scene = scene;
        this.id = id;
        this.isFlipped = false;
        this.isMatched = false;
        this.size = size;

        // Face da carta (forma)
        this.front = scene.add.image(0, 0, textureKey).setDisplaySize(size, size);
        // Verso da carta
        this.back = scene.add.image(0, 0, 'card_back').setDisplaySize(size, size);

        this.add(this.back);
        this.add(this.front);

        this.front.setVisible(false);

        this.setSize(size, size);
        this.setInteractive();

        this.on('pointerdown', () => {
            this.scene.cardClicked(this);
        });

        scene.add.existing(this);
    }

    flip() {
        if (this.isMatched) return;

        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            duration: 150,
            ease: 'Linear',
            onComplete: () => {
                this.isFlipped = !this.isFlipped;
                this.front.setVisible(this.isFlipped);
                this.back.setVisible(!this.isFlipped);

                this.scene.tweens.add({
                    targets: this,
                    scaleX: 1,
                    duration: 150,
                    ease: 'Linear'
                });
            }
        });
    }

    setMatched() {
        this.isMatched = true;
        this.setAlpha(0.5);
        this.disableInteractive();
    }
}
