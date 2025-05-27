class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;
    }

    create() {
        // Define as cartas (id, key) - pares duplicados para embaralhar
        const cardsData = [
            { id: 1, key: 'circle_red' },
            { id: 2, key: 'square_blue' },
            { id: 3, key: 'triangle_green' },
            { id: 4, key: 'circle_red' },  // par 1
            { id: 5, key: 'square_blue' }, // par 2
            { id: 6, key: 'triangle_green' }, // par 3
            { id: 7, key: 'circle_red' },  // só para exemplo, deve ser pares exatos
            { id: 8, key: 'square_blue' }, // só para exemplo
        ];

        // Normalmente aqui terá pares exatos — ou seja, duas cartas por id

        // Para simplificar, vamos duplicar e embaralhar depois
        let pairCards = [
            { id: 1, key: 'circle_red' },
            { id: 2, key: 'square_blue' },
            { id: 3, key: 'triangle_green' },
            { id: 4, key: 'circle_blue' },
            { id: 5, key: 'square_red' },
            { id: 6, key: 'triangle_red' },
            { id: 7, key: 'circle_green' },
            { id: 8, key: 'square_green' },
        ];

        // Criar pares duplicados
        let cardsArray = pairCards.concat(pairCards);

        // Embaralhar array (Fisher-Yates)
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        // Criar cartas e posicionar numa grelha 4x4
        const startX = 150;
        const startY = 100;
        const gapX = 120;
        const gapY = 180;

        for (let i = 0; i < cardsArray.length; i++) {
            let col = i % 4;
            let row = Math.floor(i / 4);
            let card = new Card(this, startX + col * gapX, startY + row * gapY, cardsArray[i].key, cardsArray[i].id);
            this.cards.push(card);
        }
    }

    cardClicked(card) {
        if (!this.canPick || card.isFlipped || card.isMatched) return;

        if (!this.firstCard) {
            this.firstCard = card;
        } else {
            this.canPick = false;

            if (this.firstCard.id === card.id) {
                // Par encontrado
                this.firstCard.setMatched();
                card.setMatched();
                this.matchedPairs++;

                this.firstCard = null;
                this.canPick = true;

                if (this.matchedPairs === this.cards.length / 2) {
                    this.time.delayedCall(1000, () => {
                        this.scene.start('GameOverScene');
                    });
                }
            } else {
                // Não é par - virar de volta após atraso
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
