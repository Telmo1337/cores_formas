class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.level = 1;
    }

    create() {
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;
        this.timeLeft = 60;

        const pairCards = [
            'circle_red', 'square_blue', 'triangle_green', 'circle_blue',
            'square_red', 'triangle_red', 'circle_green', 'square_green'
        ];

        let selectedKeys = pairCards.slice(0, 8);
        let cardsArray = selectedKeys.concat(selectedKeys).map((key, index) => ({ key, id: key }));
        Phaser.Utils.Array.Shuffle(cardsArray);

        const cols = 4;
        const rows = cardsArray.length / cols;
        const cardSize = 80;
        const gap = 10;
        const totalWidth = cols * cardSize + (cols - 1) * gap;
        const totalHeight = rows * cardSize + (rows - 1) * gap;
        const offsetX = (800 - totalWidth) / 2;
        const offsetY = (600 - totalHeight) / 2;

        for (let i = 0; i < cardsArray.length; i++) {
            let col = i % cols;
            let row = Math.floor(i / cols);
            let x = offsetX + col * (cardSize + gap) + cardSize / 2;
            let y = offsetY + row * (cardSize + gap) + cardSize / 2;
            const card = new Card(this, x, y, cardsArray[i].key, cardsArray[i].id);
            this.cards.push(card);
        }

        this.timerText = this.add.text(650, 20, `Tempo: ${this.timeLeft}`, {
            fontSize: '24px',
            fill: '#fff'
        });

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(`Tempo: ${this.timeLeft}`);
                if (this.timeLeft <= 0) {
                    this.scene.start('GameOverScene');
                }
            },
            loop: true
        });
    }

    cardClicked(card) {
        if (!this.canPick || card.isFlipped || card.isMatched) return;
        card.flip();

        if (!this.firstCard) {
            this.firstCard = card;
        } else {
            this.canPick = false;
            if (this.firstCard.id === card.id && this.firstCard !== card) {
                this.firstCard.setMatched();
                card.setMatched();
                this.matchedPairs++;
                this.time.delayedCall(500, () => {
                    this.firstCard = null;
                    this.canPick = true;
                    if (this.matchedPairs === this.cards.length / 2) {
                        this.scene.start('GameOverScene');
                    }
                });
            } else {
                this.time.delayedCall(1000, () => {
                    this.firstCard.flip();
                    card.flip();
                    this.firstCard = null;
                    this.canPick = true;
                });
            }
        }
    }
}