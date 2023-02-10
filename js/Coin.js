import ObjetGraphique from './ObjetGraphique.js';

export default class Coin extends ObjetGraphique {
    constructor(x, y, l, h, image, nbPoints) {
        super(x, y, l, h, 'black');
        this.image = image;
        this.nbPoints = nbPoints;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.l, this.h);
    }
}