class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;
    }

    create() {
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;

        const pairCards = [
            { id: 1, key: 'circle_red' },
            { id: 2, key: 'square_blue' },
            { id: 3, key: 'triangle_green' },
            { id: 4, key: 'circle_blue' },
            { id: 5, key: 'square_red' },
            { id: 6, key: 'triangle_red' },
            { id: 7, key: 'circle_green' },
            { id: 8, key: 'square_green' },
        ];
        

        let cardsArray = pairCards.concat(pairCards);

        // Shuffle com Fisher-Yates
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        const startX = 150;
        const startY = 100;
        const gapX = 120;
        const gapY = 160;

        for (let i = 0; i < cardsArray.length; i++) {
            let col = i % 4;
            let row = Math.floor(i / 4);
            let card = new Card(this, startX + col * gapX, startY + row * gapY, cardsArray[i].key, cardsArray[i].id);
            this.cards.push(card);
        }
    }

    cardClicked(card) {
        if (!this.canPick || card.isFlipped || card.isMatched) return;

        this.canPick = false;
        card.flip();

        if (!this.firstCard) {
            this.firstCard = card;
            this.canPick = true;
        } else {
            if (this.firstCard.id === card.id && this.firstCard !== card) {
                // Par correto
                this.time.delayedCall(300, () => {
                    this.firstCard.setMatched();
                    card.setMatched();
                    this.firstCard = null;
                    this.matchedPairs++;
                    this.canPick = true;

                    if (this.matchedPairs === this.cards.length / 2) {
                        this.time.delayedCall(500, () => {
                            this.scene.start('GameOverScene');
                        });
                    }
                });
            } else {
                // Não é par
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
