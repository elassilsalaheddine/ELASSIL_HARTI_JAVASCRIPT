import Sortie from "./Sortie.js";
import ObstacleAnimeClignotant from "./ObstacleAnimeClignotant.js";
import ObstacleAnime from "./ObstacleAnime.js";
import Obstacle from "./ObstacleClass.js";
import ObstacleTexture from "./ObstacleTexture.js";

let tabNiveaux = [];

let sortieLevel1 = new Sortie(500, 500, 50, "yellow");

let level1 = {
    objetsGraphiques: [
        sortieLevel1
    ],
    temps: 60,
    sortie : sortieLevel1,
    titre : "Niveau 1",
    description: "Souffre petit padawan !",
    background: "bng1",
    musique: "xmas"
}
tabNiveaux.push(level1);

let sortieLevel2 = new Sortie(600, 300, 40, "orange");
let level2 = {
    objetsGraphiques: [
        sortieLevel2,
        new ObstacleAnime(450, 0, 30, 300, 'green', 1)
    ],
    sortie: sortieLevel2,
    temps: 30,
    titre : "Niveau 2",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}
tabNiveaux.push(level2);

export { tabNiveaux }