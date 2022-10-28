class MainView {
    constructor(map, hexDrawSize) {
        this.map = map;
        this.hexDrawSize = hexDrawSize;
        // this.viewport = new Point(1280 / 2, 720 / 2);
        this.viewport = new Point(1280 / 2, 920 / 2);
        // this.viewport = new Point(20, 20);

        this.layout = new Layout(
            Layout.pointy,
            new Point(this.hexDrawSize, this.hexDrawSize),
            new Point(0, 0),
        );

        this.hexOffset = this.layout.hexCornerOffset(0);

        // https://www.redblobgames.com/grids/hexagons/#size-and-spacing
        this.worldTexture = p.createGraphics(
            (this.map.size.x * this.hexOffset.x * 2) + ((this.map.size.y - 1) * this.hexOffset.x),
            (this.map.size.y * this.hexOffset.y * 3) + this.hexOffset.y
        );
        this.worldTexture.translate(this.hexOffset.x, this.hexOffset.y * 2);
    }

    setup() {
        p.createCanvas(this.viewport.x + 100, this.viewport.y + 100);
        // debugger;
        // this.canvas.setAttributes('antialias', true);
        p.frameRate(30);


        // this.canvas.ellipse(100,100, 100, 100);
    }

    showDebug() {
        this.debugShowFPS();
        this.debugShowFrame();
    }

    draw() {
        p.clear();

        this.drawWorldTexture();
        this.drawWorldFromTexture();

        //this.drawMap()
        // this.drawViewport();

        // this.showDebug();
        // noLoop();

    }


    drawWorldTexture() {
        // Narysowac raz swiat, a potem na widoku go tylko zapetlic, albo wyskalowac


        this.worldTexture.clear();

        for (let q = 0; q < this.map.size.x; q++) {
            for (let r = 0; r < this.map.size.y; r++) {
                let mapHex = this.map.array2d[q][r];
                this.drawHexagon2(this.worldTexture, mapHex);
            }
        }
    }

    drawWorldFromTexture() {

        let w = (this.map.size.x * this.hexOffset.x * 2);
        let h = (this.map.size.y * this.hexOffset.y * 3);

        let maxX = (this.viewport.x / w);
        let maxY = (this.viewport.y / h);

        if (true) {
            //single

            p.image(this.worldTexture,
                (this.viewport.x - w) / 2,
                (this.viewport.y - h) / 2,
            );

            return;
        }


        for (let x = -1; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                p.image(this.worldTexture,
                    w * x + (y * this.hexOffset.x),
                    y * h
                );
            }
        }
    }

    debugShowFPS() {
        // p.frameRate()
        p.stroke('#BBC6C8');
        p.fill('black');
        p.textSize(12);
        // p.textAlign(CENTER, CENTER);

        p.text(parseInt(p.frameRate()), 20, 20);

    }

    debugShowFrame() {
        p.stroke('blue');
        p.fill(0, 0, 0, 0);

        p.rect(0, 0, this.viewport.x, this.viewport.y);
    }

    drawViewport() {
        p.stroke('red');
        p.fill(0, 0, 0, 0);
        p.rect(50, 50, this.viewport.x, this.viewport.y);
    }

    drawMap() {


        p.stroke('#E5E3E4');
        p.fill('white');

        let hexOffset = this.layout.hexCornerOffset(0);
        // ile zmiesci sie na X
        let maxX = (this.viewport.x / hexOffset.x) / 2;
        // ile zmiesci sie na Y
        let maxY = (this.viewport.y / hexOffset.y) / 3;

        let left = 0;
        let right = maxX;
        let top = 0;
        let bottom = maxY;

        // console.log(maxX, maxY);

        for (let r = top; r <= bottom; r++) { // pointy top
            let r_offset = p.floor(r / 2.0);
            for (let q = left - r_offset; q <= right - r_offset; q++) {
                this.drawHexagon(p, new Hex(q, r, -q - r));
            }
        }
    }

    drawHexagon2(convas, mapHex) {
        convas.strokeWeight(this.hexDrawSize / 7); // 3
        convas.stroke('white');
        convas.fill(mapHex.color);

        convas.beginShape();
        let points = this.layout.polygonCorners(mapHex);
        for (const point of points) {
            convas.vertex(point.x, point.y);
        }
        convas.endShape(p.CLOSE);
    }

    drawHexagon(convas, hex) {
        let mapHex = this.map.getMapHex(hex);

        convas.push();

        convas.strokeWeight(this.hexDrawSize / 7); // 3
        convas.stroke('white');
        convas.fill(mapHex.color);

        // Animacja
        let noiseVal = p.noise(hex.q, hex.r, p.frameCount / 200);
        noiseVal = p.noise(mapHex.q, mapHex.r);
        noiseVal = p.noise(mapHex.q, mapHex.r, p.frameCount / 100);

        //fill(noiseVal * 255);

        if (mapHex.color === 'transparent') {
            // return; // nie rysujemy :D
        }

        convas.beginShape();

        let points = this.layout.polygonCorners(hex);
        for (const point of points) {
            convas.vertex(point.x, point.y);
        }

        convas.endShape(p.CLOSE);

        // this.drawHexagonLabel(points[5], hex, mapHex);

        convas.pop();
    }

    drawHexagonLabel(point, hex, mapHex) {
        p.stroke('#BBC6C8');
        p.fill('black');
        p.textSize(12);
        p.textAlign(CENTER, CENTER);

        p.text('' + (hex.q) + ',' + (hex.r) + ',' + (hex.s) + '', point.x, point.y - hex_size_R - 6);
        p.text('' + (mapHex.q) + ',' + (mapHex.r) + ',' + (mapHex.s) + '', point.x, point.y - hex_size_R + 6);
    }
}