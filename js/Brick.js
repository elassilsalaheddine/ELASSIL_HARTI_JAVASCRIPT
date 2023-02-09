import ObjetGraphique from "./ObjetGraphique.js";

export default class Brick extends ObjetGraphique {

    constructor(x, y ,nom, spriteSheet, nbPoints) {
        super(x, y, 105, 35,  "blue");
        this.nom = nom;
        this.spriteSheet = spriteSheet;
        this.cassee = false;
        this.nbPoints = nbPoints;
    }

    draw(ctx) {
        this.drawBoundingBox(ctx);

        if(!this.cassee)
            this.spriteSheet.draw(ctx, this.nom, this.x, this.y);
        else 
            this.spriteSheet.draw(ctx, this.nom + "Cassee", this.x, this.y);      
    }
}