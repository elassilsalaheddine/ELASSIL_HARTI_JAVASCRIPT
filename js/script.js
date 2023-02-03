let canvas, ctx;
let mousePos = { x: 0, y: 0 };

// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;

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
    dessineCorps: function (ctx) {
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

function init(event) {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');

    // On va prendre en compte le clavier
    ajouteEcouteursClavier();
    ajouteEcouteurSouris();

    creerDesObstaclesLevel1();

    requestAnimationFrame(animationLoop);

}

function ajouteEcouteurSouris() {
    window.onmousemove = (event) => {
        // on récupère la positon de la souris et on
        // la stocke dans une variable globale mousePos
        // adjust mouse position relative to the canvas
        var rect = event.target.getBoundingClientRect()
        mousePos.x = event.clientX - rect.left;
        mousePos.y = event.clientY - rect.top;
        //console.log(mousePos);
    }
}

function ajouteEcouteursClavier() {
    // On va écouter les événements clavier
    // et on va modifier la vitesse du joueur
    // en fonction de la touche pressée
    window.onkeydown = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                joueur.vx = -5;
                break;
            case 'ArrowRight':
                joueur.vx = 5;
                break;
            case 'ArrowUp':
                joueur.vy = -5;
                break;
            case 'ArrowDown':
                joueur.vy = 5;
                break;
        }

    }

    window.onkeyup = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                joueur.vx = 0;
                break;
            case 'ArrowRight':
                joueur.vx = 0;
                break;
            case 'ArrowUp':
                joueur.vy = 0;
                break;
            case 'ArrowDown':
                joueur.vy = 0;
                break;
        }
    }

}

var y = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - On dessine le nouveau contenu
    joueur.draw(ctx);
    dessinerLesObstacles(ctx);

    // 3 - on déplace les objets
    joueur.move();
    //joueur.followMouse()
    joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
    detecteCollisionJoueurAvecObstacles()

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}



function exempleDessin() {
    ctx.lineWidth = 20
    ctx.strokeStyle = 'green';
    ctx.strokeRect(10, y, 100, 150);

    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    ctx.fillRect(0, 10, 50, 70);

    ctx.lineWidth = 2
    ctx.font = "130px Arial";
    ctx.fillText("Hello", 190, 100);
    ctx.strokeText("Hello", 190, 100);

    // Les rectangles avec strokeRect et fillRect sont en mode "immédiat"
    // les cercles, lignes, courbes, sont en mode "bufférisé" ou "chemin" (path)
    // On commence par définir le chemin et à la fin tout le chemin est dessiné
    // d'un coup dans le GPU
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    // 3 - On déplace les objets, on regarde ce que fait le joueur avec la souris, etc.
    // On teste les collisions etc... bref, on change l'état des objets graphiques à dessiner
    y += 0.1;
}

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

function dessinerLesObstacles() {
    tableauDesObstacles.forEach(o => {
        o.draw(ctx);
    });
    /*
    for(let i = 0; i < tableauDesObstacles.length; i++) {
        tableauDesObstacles[i].draw(ctx);
    }
    */
}


function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObstacles.forEach(o => {
        if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
            collisionExist = true;
        } 
    });
    if(collisionExist) {
        joueur.couleur = 'red';
    } else {
        joueur.couleur = 'green';
    }
}

// Collisions between aligned rectangles
function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {

    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false; // No horizontal axis projection overlap
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false; // No vertical axis projection overlap
    return true;    // If previous tests failed, then both axis projections
    // overlap and the rectangles intersect
}