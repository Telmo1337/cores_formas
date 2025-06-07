class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;
    }

    //rebe os dados do nivel atual, tempo extra e pontuaçao
    init(data) {
        this.level = data.level || 1;
        this.bonusTime = data.bonusTime || 0;
        this.score = data.score || 0;
    }

    create() {
        //variaveis do jogo
        this.cards = [];
        this.firstCard = null;
        this.canPick = true;
        this.matchedPairs = 0;

        //criar a imagem de fundo com base no nivel
        const backgroundIMG = `bglvl${this.level}`;
        this.add.image(400, 300, backgroundIMG).setDisplaySize(800, 600);

        //soundtracks do jogo
        this.musicTracks = ['bgm1', 'bgm2'];
        this.currentTrackIndex = 0;
        this.playNextTrack();

        //criar texto da pontuação 
        this.scoreText = this.add.text(20, 20, `Pontuação: ${this.score}`, {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        });

        //criar texto do nivel que mostra o nivel atual
        // (se o nivel for 1, mostra "Nível: 1", se for 2, mostra "Nível: 2", etc.)
        this.levelText = this.add.text(20, 50, `Nível: ${this.level}`, {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        });

        //definir o tempo com base no nivel e no tempo extra
        this.timeLeft = 60 - (this.level - 1) * 10 + this.bonusTime;
        if (this.timeLeft < 20) this.timeLeft = 20; // Tempo mínimo

        //criar texto do tempo
        this.timerText = this.add.text(650, 20, `Tempo: ${this.timeLeft}`, {
            fontSize: '24px',
            fill: '#FFFFFF',
            fontFamily: 'Roboto'
        });

        //event que atualiza o tempo a cada segundo
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

        //criar as cartas no tabuleiro
        this.createBoard();
    }

    //tocar a musica e prepara a prox quando acabar
    playNextTrack() {
        const trackKey = this.musicTracks[this.currentTrackIndex];
        this.backgroundMusic = this.sound.add(trackKey);
        this.backgroundMusic.play();

        this.backgroundMusic.once('complete', () => {
            this.currentTrackIndex++;
            if (this.currentTrackIndex >= this.musicTracks.length) {
                this.currentTrackIndex = 0;
            }
            this.playNextTrack();
        });
    }

    //gerar as cartas para o tabuleiro
    createBoard() {
        let pairsCount = Math.min(this.level + 2, 8); // nº de pares aumenta com o nivel

        //lista possivel de pares (formas e cores)
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

        //escolher os pares e duplica (para formar pares)
        let pairCards = possiblePairs.slice(0, pairsCount);
        let cardsArray = pairCards.concat(pairCards);

        //baralhar as cartas
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }

        //definir o layout do tabuleiro
        const cols = 4;
        const rows = Math.ceil(cardsArray.length / cols);
        const cardSize = 70;
        const gapX = 10;
        const gapY = 15;

        const totalWidth = cols * cardSize + (cols - 1) * gapX;
        const startX = (800 - totalWidth) / 2 + cardSize / 2;

        const totalHeight = rows * cardSize + (rows - 1) * gapY;
        const startY = (600 - totalHeight) / 2 + cardSize / 2 + 30;

        //criar cada carta no ecra
        for (let i = 0; i < cardsArray.length; i++) {
            let col = i % cols;
            let row = Math.floor(i / cols);
            let x = startX + col * (cardSize + gapX);
            let y = startY + row * (cardSize + gapY);

            let card = new Card(this, x, y, cardsArray[i].key, cardsArray[i].id, cardSize);
            this.cards.push(card);
        }
    }

    //logica ao clicar numa carta
    cardClicked(card) {
        //ignora se n puder clicar ou se a carta ja estiver virada ou combinada
        if (!this.canPick || card.isFlipped || card.isMatched) return;

        card.flip(true);

        if (!this.firstCard) {
            //primeira carta virada
            this.firstCard = card;
        } else {
            //segunda carta virada
            this.canPick = false;

            if (this.firstCard.id === card.id && this.firstCard !== card) {
                //cartas coincidem 
                this.firstCard.setMatched();
                card.setMatched();
                this.matchedPairs++;

                //aumento da pontuaçao com base no tempo restante
                this.score += this.timeLeft * 10;
                this.scoreText.setText(`Pontuação: ${this.score}`);

                //verifica se o nivel foi concluido
                this.time.delayedCall(500, () => {
                    this.firstCard = null;
                    this.canPick = true;

                    if (this.matchedPairs === this.cards.length / 2) {
                        //define tempo extra para o prox nivel
                        let extra = 0;
                        switch (this.level) {
                            case 1: extra = 2; break;
                            case 2: extra = 6; break;
                            case 3: extra = 9; break;
                            case 4: extra = 13; break;
                            default: extra = 0; break;
                        }

                        //vai para o próximo nível
                        if (this.level < 5) {
                            this.scene.start('GameScene', {
                                level: this.level + 1,
                                bonusTime: extra,
                                score: this.score
                            });
                        } else {

                            this.scene.start('GameOverScene', { win: true, score: this.score });
                        }
                    }
                });

            } else {
                //se as cartas nao coincidirem — volta a vira las apos um tempo (delayed call 1000ms = 1s)
                this.time.delayedCall(1000, () => {
                    this.firstCard.flip(false);
                    card.flip(false);
                    this.firstCard = null;
                    this.canPick = true;
                });
            }
        }
    }
}
