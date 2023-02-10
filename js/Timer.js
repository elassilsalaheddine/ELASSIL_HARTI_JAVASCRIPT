export default class Timer {
    constructor(type) {
        this.type = type;
        if (type === "decompte") {
            this.dtemps = -1;
        } else if (type === "chrono") {
            this.dtemps = 1;
        }
        this.started = false;
    }

    setTime(temps) {
        this.temps = temps;
    }

    start() {
        this.started = true;
        this.id = setInterval(() => {
            if (this.type === "decompte") {
                this.temps--;

                if (this.temps === 0) {
                    clearInterval(this.id);
                }
            } else if (this.type === "chrono") {
                this.temps++;
            }
        }, 1000);
    }

    stop() {
        if (this.started) {
            //console.log("stop chrono")
            clearInterval(this.id);
            this.started = false;
        }
    }

    getTime() {
        return this.temps;
    }
    
    draw(ctx, x, y) {
        // affichage
        //this.htmlElem.innerHTML = this.temps;
        ctx.font = "30px Arial";
        ctx.fillText(this.temps, x, y);
    }
}