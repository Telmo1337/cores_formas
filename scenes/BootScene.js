class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        //sons
        this.load.audio('bgm1', 'assets/sounds/music1.mp3');
        this.load.audio('bgm2', 'assets/sounds/music2.mp3');
        //menumusic
        this.load.audio('menuMusic', 'assets/sounds/menumusic.mp3');
        //gameovermsuic
        this.load.audio('gameOverMusic', 'assets/sounds/gameover.mp3');
        //cardflip
        this.load.audio('flipSound', 'assets/sounds/flipsound.mp3');
        //images
        this.load.image('bglvl1', 'assets/STR/backgroundlevel1.png');
        this.load.image('bglvl2', 'assets/STR/backgroundlevel2.png');
        this.load.image('bglvl3', 'assets/STR/backgroundlevel3.png');
        this.load.image('bglvl4', 'assets/STR/backgroundlevel4.png');
        this.load.image('bglvl5', 'assets/STR/backgroundlevel5.png');
        //menubackground
        this.load.image('menuBg', 'assets/STR/menu.jpg');
    }

    create() {
        //criar as texturas das formas
        this.createShapeTexture('circle_red', 0xff0000, 'circle');
        this.createShapeTexture('square_blue', 0x0000ff, 'square');
        this.createShapeTexture('triangle_green', 0x00ff00, 'triangle');
        this.createShapeTexture('circle_blue', 0x0000ff, 'circle');
        this.createShapeTexture('square_red', 0xff0000, 'square');
        this.createShapeTexture('triangle_red', 0xff0000, 'triangle');
        this.createShapeTexture('circle_green', 0x00ff00, 'circle');
        this.createShapeTexture('square_green', 0x00ff00, 'square');

        //criar a textura das costas das cartas
        this.createBackTexture('card_back');

        //iniciar a cena do menu
        this.scene.start('MenuScene');
    }


    //metodo para criar texturas de formas
    createShapeTexture(key, color, shape) {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(color, 1);

        switch(shape) {
            case 'circle':
                graphics.fillCircle(50, 50, 40);
                break;
            case 'square':
                graphics.fillRect(10, 10, 80, 80);
                break;
            case 'triangle':
                graphics.beginPath();
                graphics.moveTo(50, 10);
                graphics.lineTo(90, 90);
                graphics.lineTo(10, 90);
                graphics.closePath();
                graphics.fillPath();
                break;
        }
        //gere a textura
        graphics.generateTexture(key, 100, 100);
        //limpa os graficos
        graphics.destroy();
    }

    //metodo para criar a textura do verso das cartas
    createBackTexture(key) {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x808080, 1); // cinza para o verso
        graphics.fillRect(0, 0, 100, 100);

        graphics.generateTexture(key, 100, 100);
        graphics.destroy();
    }
}
