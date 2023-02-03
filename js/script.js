let canvas, ctx;

// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;

function init() {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas  = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');
 
    requestAnimationFrame(animationLoop);

}

var y = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - On dessine le nouveau contenu
    ctx.lineWidth = 20
    ctx.strokeStyle = 'green';
    ctx.strokeRect(10, y, 100, 150);

    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    ctx.fillRect(0, 10, 50, 70);

    // 3 - On déplace les objets, on regarde ce que fait le joueur avec la souris, etc.
    // On teste les collisions etc... bref, on change l'état des objets graphiques à dessiner
    y+=0.1;
    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}