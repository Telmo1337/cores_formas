class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {}

    create() {
        this.createShapeTexture('circle_red', 0xff0000, 'circle');
        this.createShapeTexture('square_blue', 0x0000ff, 'square');
        this.createShapeTexture('triangle_green', 0x00ff00, 'triangle');
        this.createShapeTexture('circle_blue', 0x0000ff, 'circle');
        this.createShapeTexture('square_red', 0xff0000, 'square');
        this.createShapeTexture('triangle_red', 0xff0000, 'triangle');
        this.createShapeTexture('circle_green', 0x00ff00, 'circle');
        this.createShapeTexture('square_green', 0x00ff00, 'square');
        this.createBackTexture('card_back');

        this.scene.start('MenuScene');
    }

    createShapeTexture(key, color, shape) {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(color, 1);
        switch (shape) {
            case 'circle':
                graphics.fillCircle(40, 40, 30);
                break;
            case 'square':
                graphics.fillRect(10, 10, 60, 60);
                break;
            case 'triangle':
                graphics.beginPath();
                graphics.moveTo(40, 10);
                graphics.lineTo(70, 70);
                graphics.lineTo(10, 70);
                graphics.closePath();
                graphics.fillPath();
                break;
        }
        graphics.generateTexture(key, 80, 80);
        graphics.destroy();
    }

    createBackTexture(key) {
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x888888, 1);
        graphics.fillRect(0, 0, 80, 80);
        graphics.generateTexture(key, 80, 80);
        graphics.destroy();
    }
}