class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;
    }

    init(data) {
        this.level = data.level || 1;
    }

    create() {
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;

        this.score = this.registry.get('score') || 0;

        this.scoreText = this.add.text(20, 20, `Pontuação: ${this.score}`, { fontSize: '24px', fill: '#000000' });
        this.levelText = this.add.text(20, 50, `Nível: ${this.level}`, { fontSize: '24px', fill: '#000000' });

        this.timeLeft = 60 - (this.level - 1) * 10; // Tempo diminui 10 seg a cada nível, mínimo 20s
        if (this.timeLeft < 20) this.timeLeft = 20;

        this.timerText = this.add.text(650, 20, `Tempo: ${this.timeLeft}`, { fontSize: '24px', fill: '#000000' });

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

        this.createBoard();
    }

    createBoard() {
        // Números pares de cartas - aumenta com o nível (máx 8 pares)
        let pairsCount = Math.min(this.level + 2, 8); // ex: nível 1 -> 3 pares, até 8 pares max

        // Array com pares possíveis (usamos texturas já criadas)
        const possiblePairs = [
            { id: 1, key: 'circle_red' },
            { id: 2, key: 'square_blue' },
            { id: 3, key: 'triangle_green' },
            { id: 4, key: 'circle_blue' },
            { id: 5, key: 'square_red' },
            { id: 6, key: 'triangle_red' },
            { id: 7, key: 'circle_green' },
            { id: 8, key: 'square_green' },
        ];

        // Selecionar somente os pares necessários para o nível
        let pairCards = possiblePairs.slice(0, pairsCount);

        // Duplicar para formar pares
        let cardsArray = pairCards.concat(pairCards);

        // Embaralhar Fisher-Yates
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        // Definir posição e gap menores para caber na tela 800x600
        const cols = 4;
        const rows = Math.ceil(cardsArray.length / cols);

        const cardSize = 70; // cartas menores
        const gapX = 10;
        const gapY = 15;

        // Calcular offset para centralizar no eixo X
        const totalWidth = cols * cardSize + (cols - 1) * gapX;
        const startX = (800 - totalWidth) / 2 + cardSize/2;

        // Calcular offset para centralizar no eixo Y
        const totalHeight = rows * cardSize + (rows - 1) * gapY;
        const startY = (600 - totalHeight) / 2 + cardSize/2 + 30; // +30 para não colar no topo

        for (let i = 0; i < cardsArray.length; i++) {
            let col = i % cols;
            let row = Math.floor(i / cols);

            let x = startX + col * (cardSize + gapX);
            let y = startY + row * (cardSize + gapY);

            let card = new Card(this, x, y, cardsArray[i].key, cardsArray[i].id, cardSize);
            this.cards.push(card);
        }
    }

    cardClicked(card) {
        if (!this.canPick || card.isFlipped || card.isMatched) return;

        card.flip();

        if (!this.firstCard) {
            this.firstCard = card;
        } else {
            this.canPick = false;

            if (this.firstCard.id === card.id && this.firstCard !== card) {
                // Par encontrado
                this.firstCard.setMatched();
                card.setMatched();
                this.matchedPairs++;

                // Incrementar pontuação com tempo restante
                this.score += this.timeLeft * 10;
                this.scoreText.setText(`Pontuação: ${this.score}`);
                this.registry.set('score', this.score);

                this.time.delayedCall(500, () => {
                    this.firstCard = null;
                    this.canPick = true;

                    if (this.matchedPairs === this.cards.length / 2) {
                        if (this.level < 5) {
                            this.scene.start('GameScene', { level: this.level + 1 });
                        } else {
                            this.scene.start('GameOverScene', { win: true });
                        }
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
