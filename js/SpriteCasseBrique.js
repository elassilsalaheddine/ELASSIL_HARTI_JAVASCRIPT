export default class SpriteCasseBrique {
    constructor(spritesheetImage) {
        this.spritesheetImage = spritesheetImage;

        this.sprites = new Map();
        // extraction des sous-images du spritesheet
        this.sprites.set('briqueBleue', {x:10 , y: 10, l: 105, h: 35});
        this.sprites.set('briqueBleueCassee', {x: 116, y: 3, l: 110, h: 47});   
    }

    draw(ctx, spriteName, x, y) {
        let sprite = this.sprites.get(spriteName);
        ctx.drawImage(this.spritesheetImage, sprite.x, sprite.y, sprite.l, sprite.h, x, y, sprite.l, sprite.h);
    }
}