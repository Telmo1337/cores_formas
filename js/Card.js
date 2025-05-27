class Card extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, id) {
        super(scene, x, y);

        this.id = id; // Identificador para comparar pares
        this.isFlipped = false;
        this.isMatched = false;

        this.back = scene.add.rectangle(0, 0, 100, 150, 0x555555).setStrokeStyle(2, 0x000000);
        this.front = scene.add.image(0, 0, key).setVisible(false);

        this.add(this.back);
        this.add(this.front);

        this.setSize(100, 150);
        this.setInteractive();

        this.on('pointerdown', () => {
            if (!this.isFlipped && !this.isMatched) {
                this.flip();
                scene.cardClicked(this);
            }
        });

        scene.add.existing(this);
    }

    flip() {
        this.isFlipped = !this.isFlipped;
        this.front.setVisible(this.isFlipped);
        this.back.setVisible(!this.isFlipped);
    }

    setMatched() {
        this.isMatched = true;
        // Pode adicionar animação aqui se quiser
    }
}
