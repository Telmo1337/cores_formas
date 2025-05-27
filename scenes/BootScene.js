class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Nada para carregar aqui (sem imagens externas)
    }

    create() {
        // Criar texturas para as cartas com formas e cores
        this.createShapeTexture('circle_red', 0xff0000, 'circle');
        this.createShapeTexture('square_blue', 0x0000ff, 'square');
        this.createShapeTexture('triangle_green', 0x00ff00, 'triangle');
        this.createShapeTexture('circle_blue', 0x0000ff, 'circle');
        this.createShapeTexture('square_red', 0xff0000, 'square');
        this.createShapeTexture('triangle_red', 0xff0000, 'triangle');
        this.createShapeTexture('circle_green', 0x00ff00, 'circle');
        this.createShapeTexture('square_green', 0x00ff00, 'square');

        // Criar textura para a face traseira da carta (exemplo simples)
        this.createBackTexture('card_back');

        this.scene.start('MenuScene');
    }

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

        graphics.generateTexture(key, 100, 100);
        graphics.destroy();
    }

    createBackTexture(key) {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x808080, 1); // cinza para o verso
        graphics.fillRect(0, 0, 100, 100);

        graphics.generateTexture(key, 100, 100);
        graphics.destroy();
    }
}
