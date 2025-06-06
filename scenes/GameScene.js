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
        this.bonusTime = data.bonusTime || 0; // Tempo bônus específico para este nível
        this.score = data.score || 0;
    }

    create() {
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;

        //add imagens em cada nível
        const backgroundIMG = `bglvl${this.level}`;
        this.add.image(400,300, backgroundIMG).setDisplaySize(800,600);


        //add music
        this.musicTracks = ['bgm1', 'bgm2', 'bgm3'];
        this.currentTrackIndex = 0;

        this.playNextTrack();






        this.scoreText = this.add.text(20, 20, `Pontuação: ${this.score}`, {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        });

        this.levelText = this.add.text(20, 50, `Nível: ${this.level}`, {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        });

        // Tempo base com bônus (não acumulativo)
        this.timeLeft = 60 - (this.level - 1) * 10 + this.bonusTime;
        if (this.timeLeft < 20) this.timeLeft = 20;

        this.timerText = this.add.text(650, 20, `Tempo: ${this.timeLeft}`, {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        });

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(`Tempo: ${this.timeLeft}`);

                if (this.timeLeft <= 0) {
                    this.scene.start('GameOverScene', { score: this.score });
                }
            },
            loop: true
        });

        this.createBoard();
    }

    playNextTrack() {
        const trackKey = this.musicTracks[this.currentTrackIndex];
        
        this.backgroundMusic = this.sound.add(trackKey);
        this.backgroundMusic.play();
    
        // Quando terminar, tocar a próxima
        this.backgroundMusic.once('complete', () => {
            this.currentTrackIndex++;
            if (this.currentTrackIndex >= this.musicTracks.length) {
                this.currentTrackIndex = 0; // recomeça a lista
            }
            this.playNextTrack();
        });
    }
    

    createBoard() {
        let pairsCount = Math.min(this.level + 2, 8);

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

        let pairCards = possiblePairs.slice(0, pairsCount);
        let cardsArray = pairCards.concat(pairCards);

        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        const cols = 4;
        const rows = Math.ceil(cardsArray.length / cols);

        const cardSize = 70;
        const gapX = 10;
        const gapY = 15;

        const totalWidth = cols * cardSize + (cols - 1) * gapX;
        const startX = (800 - totalWidth) / 2 + cardSize / 2;

        const totalHeight = rows * cardSize + (rows - 1) * gapY;
        const startY = (600 - totalHeight) / 2 + cardSize / 2 + 30;

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
                this.firstCard.setMatched();
                card.setMatched();
                this.matchedPairs++;

                this.score += this.timeLeft * 10;
                this.scoreText.setText(`Pontuação: ${this.score}`);

                this.time.delayedCall(500, () => {
                    this.firstCard = null;
                    this.canPick = true;

                    if (this.matchedPairs === this.cards.length / 2) {
                        // Tempo bônus somente para o próximo nível
                        let extra = 0;
                        switch (this.level) {
                            case 1: extra = 2; break;
                            case 2: extra = 6; break;
                            case 3: extra = 9; break;
                            case 4: extra = 13; break;
                            default: extra = 0; break;
                        }

                        if (this.level < 5) {
                            this.scene.start('GameScene', {
                                level: this.level + 1,
                                bonusTime: extra,  // Só esse valor, sem acumular
                                score: this.score
                            });
                        } else {
                            this.scene.start('GameOverScene', { win: true, score: this.score });
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
