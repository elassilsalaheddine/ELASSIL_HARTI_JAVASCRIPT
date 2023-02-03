import { joueur } from './joueur.js';
import { tableauDesObstacles, creerDesObstaclesLevel1, dessinerLesObstacles } from './obstacles.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { rectsOverlap } from './collisions.js';


let canvas, ctx;
let gameState = 'menuStart';
// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;


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


var y = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'jeuEnCours':
            // 2 - On dessine le nouveau contenu
            joueur.draw(ctx);
            dessinerLesObstacles(ctx);

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();

            joueur.move();
            //joueur.followMouse()
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            detecteCollisionJoueurAvecObstacles();
            break;
    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheMenuStart(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("Press space to start", 190, 100);
    ctx.strokeText("Press space to start", 190, 100);
    if(inputState.space) {
        gameState = 'jeuEnCours';
    }
}   
function afficheGameOver(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    if(inputState.space) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
}  
function testeEtatClavierPourJoueur() {
    joueur.vx = 0;
    if (inputState.left) {
        joueur.vx = -5;
    } else {
        if (inputState.right) joueur.vx = 5;
    }
    joueur.vy = 0;
    if (inputState.up) {
        joueur.vy = -5;
    } else {
        if (inputState.down) joueur.vy = 5;
    }
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



function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObstacles.forEach(o => {
        if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
            collisionExist = true;
        }
    });
    if (collisionExist) {
        joueur.couleur = 'red';
        gameState = 'gameOver';
    } else {
        joueur.couleur = 'green';
    }
}

