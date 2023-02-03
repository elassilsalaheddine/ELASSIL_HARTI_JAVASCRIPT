let joueur = {
    x: 0,
    y: 0,
    l: 50,
    h: 50,
    vx: 0,
    vy: 0,
    couleur: 'red',
    nbVies: 3,
    draw: function (ctx) {
        // bonne pratique : si on change le contexte (position du repère, couleur, ombre, etc.)
        // on sauvegarde le contexte avant de le modifier et
        // on le restaure à la fin de la fonction
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.l, this.h);
        // on dessine les yeux
        ctx.fillStyle = 'yellow';
        ctx.fillRect(5, 5, 10, 10);
        ctx.fillRect(32, 5, 10, 10);
        // bouche
        ctx.fillRect(15, 30, 20, 10);
        this.dessineCorps(ctx);

        ctx.restore();
    },
    dessineCorps: function(ctx) {
        ctx.save();
        ctx.translate(0, 50);
        ctx.fillStyle = 'blue';
        ctx.fillRect(12, 0, 25, 30);
        ctx.restore();
    },
    move: function () {
        this.x += this.vx;
        this.y += this.vy;
    },
    followMouse: function () {
        this.x = mousePos.x - this.l / 2;
        this.y = mousePos.y - this.h / 2;
        //this.x = mousePos.x;
        //this.y = mousePos.y;
    },
    testeCollisionAvecBordsDuCanvas: function (largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = largeurCanvas - this.l;
            this.vitesse = -this.vitesse;
        }
        if (this.x < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = 0;
            this.vitesse = -this.vitesse;
        }
    }
}

export { joueur }