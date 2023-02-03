let tableauDesObstacles = [];

function creerDesObstaclesLevel1() {
    let obstacle1 = {
        x: 250,
        y: 0,
        l: 30,
        h: 300,
        couleur: 'green',
        draw: function (ctx) {
            ctx.save();
            ctx.fillStyle = this.couleur;
            ctx.fillRect(this.x, this.y, this.l, this.h);
            ctx.restore();
        }
    };
    // On l'ajoute au tableau
    tableauDesObstacles.push(obstacle1);

    let obstacle2 = {
        x: 450,
        y: 0,
        l: 30,
        h: 300,
        couleur: 'green',
        draw: function (ctx) {
            ctx.save();
            ctx.fillStyle = this.couleur;
            ctx.fillRect(this.x, this.y, this.l, this.h);
            ctx.restore();
        }
    };
    tableauDesObstacles.push(obstacle2);
}

function dessinerLesObstacles(ctx) {
    tableauDesObstacles.forEach(o => {
        o.draw(ctx);
    });
    /*
    for(let i = 0; i < tableauDesObstacles.length; i++) {
        tableauDesObstacles[i].draw(ctx);
    }
    */
}

export { tableauDesObstacles, creerDesObstaclesLevel1, dessinerLesObstacles}