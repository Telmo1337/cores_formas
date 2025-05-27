class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Nada a carregar de fora
    }

    create() {
        const shapes = [
            { key: 'circle_red', color: 0xff0000, shape: 'circle' },
            { key: 'circle_blue', color: 0x0000ff, shape: 'circle' },
            { key: 'circle_green', color: 0x00ff00, shape: 'circle' },

            { key: 'square_red', color: 0xff0000, shape: 'square' },
            { key: 'square_blue', color: 0x0000ff, shape: 'square' },
            { key: 'square_green', color: 0x00ff00, shape: 'square' },

            { key: 'triangle_red', color: 0xff0000, shape: 'triangle' },
            { key: 'triangle_green', color: 0x00ff00, shape: 'triangle' },
            { key: 'triangle_blue', color: 0x0000ff, shape: 'triangle' }
        ];

        shapes.forEach(({ key, color, shape }) => {
            this.createShapeTexture(key, color, shape);
        });

        this.createBackTexture('card_back');

        this.scene.start('MenuScene');
    }

    createShapeTexture(key, color, shape) {
        const size = 80;
        const center = size / 2;
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });

        graphics.fillStyle(color, 1);

        switch(shape) {
            case 'circle':
                graphics.fillCircle(center, center, size / 2.5);
                break;
            case 'square':
                graphics.fillRect(center - 25, center - 25, 50, 50);
                break;
            case 'triangle':
                graphics.beginPath();
                graphics.moveTo(center, center - 30);
                graphics.lineTo(center + 30, center + 25);
                graphics.lineTo(center - 30, center + 25);
                graphics.closePath();
                graphics.fillPath();
                break;
        }

        graphics.generateTexture(key, size, size);
        graphics.destroy();
    }

    createBackTexture(key) {
        const size = 80;
        const graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(0x888888, 1);
        graphics.fillRect(0, 0, size, size);

        // Detalhe simples no verso (linha branca)
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.strokeRect(4, 4, size - 8, size - 8);

        graphics.generateTexture(key, size, size);
        graphics.destroy();
    }
}
