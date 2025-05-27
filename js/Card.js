class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, frontKey, id) {
        super(scene, x, y);
        this.scene = scene;
        this.id = id;
        this.isFlipped = false;
        this.isMatched = false;

        this.front = scene.add.image(0, 0, frontKey).setVisible(false);
        this.back = scene.add.image(0, 0, 'card_back');
        this.add(this.front);
        this.add(this.back);

        this.setSize(80, 80);
        this.setInteractive();
        scene.add.existing(this);

        this.on('pointerdown', () => {
            if (this.scene.canPick && !this.isFlipped && !this.isMatched) {
                this.scene.cardClicked(this);
            }
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
    }
}