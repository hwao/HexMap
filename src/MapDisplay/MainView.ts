import {Point} from "../MapGeometry/Point";
import {Layout} from "../MapGeometry/Layout";
import {Map} from "../Map/Map";
import p5 from "p5";
import {Hex} from "../MapGeometry/Hex";
import {MapHex} from "../Map/MapHex";


export class MainView {
    public viewport: Point;
    public layout: Layout;
    public hexOffset: Point;
    private worldTexture: p5.Element & p5;
    private screenCanvas: p5.Element | p5;

    constructor(public map: Map, public hexDrawSize: number, public p5: p5) {
        // this.viewport = new Point(1280 / 2, 720 / 2);
        this.viewport = new Point(1280 / 2, 920 / 2);
        // this.viewport = new Point(20, 20);

        this.layout = new Layout(
            Layout.pointy,
            new Point(this.hexDrawSize, this.hexDrawSize),
            new Point(0, 0),
        );

        this.hexOffset = this.layout.hexCornerOffset(0);

        this.screenCanvas = this.p5;
        // https://www.redblobgames.com/grids/hexagons/#size-and-spacing
        this.worldTexture = this.p5.createGraphics(
            (this.map.size.x * this.hexOffset.x * 2) + ((this.map.size.y - 1) * this.hexOffset.x),
            (this.map.size.y * this.hexOffset.y * 3) + this.hexOffset.y
        );
        this.worldTexture.translate(this.hexOffset.x, this.hexOffset.y * 2);
    }

    public setup() {
        this.p5.createCanvas(this.viewport.x + 100, this.viewport.y + 100);
        // debugger;
        // this.canvas.setAttributes('antialias', true);
        this.p5.frameRate(30);


        // this.canvas.ellipse(100,100, 100, 100);
    }

    private showDebug() {
        this.debugShowFPS();
        this.debugShowFrame();
    }

    public draw() {
        this.p5.background([0, 0, 0, 0]);

        this.drawWorldTexture();
        this.drawWorldFromTexture();

        //this.drawMap()
        // this.drawViewport();

        // this.showDebug();
        // noLoop();

    }


    private drawWorldTexture() {
        // Narysowac raz swiat, a potem na widoku go tylko zapetlic, albo wyskalowac


        this.worldTexture.background([0, 0, 0, 0]);

        for (let q = 0; q < this.map.size.x; q++) {
            for (let r = 0; r < this.map.size.y; r++) {
                const mapHex = this.map.array2d[q][r];
                this.drawHexagon2(this.worldTexture, mapHex);
            }
        }
    }

    private drawWorldFromTexture() {

        const w = (this.map.size.x * this.hexOffset.x * 2);
        const h = (this.map.size.y * this.hexOffset.y * 3);

        const maxX = (this.viewport.x / w);
        const maxY = (this.viewport.y / h);

        if (true) {
            //single

            this.p5.image(this.worldTexture,
                (this.viewport.x - w) / 2,
                (this.viewport.y - h) / 2,
            );

            return;
        }


        for (let x = -1; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                this.p5.image(this.worldTexture,
                    w * x + (y * this.hexOffset.x),
                    y * h
                );
            }
        }
    }

    private debugShowFPS() {
        // p.frameRate()
        this.p5.stroke('#BBC6C8');
        this.p5.fill('black');
        this.p5.textSize(12);
        // this.p5.textAlign(CENTER, CENTER);

        this.p5.text(this.p5.frameRate(), 20, 20);
    }

    private debugShowFrame() {
        this.p5.stroke('blue');
        this.p5.fill(0, 0, 0, 0);

        this.p5.rect(0, 0, this.viewport.x, this.viewport.y);
    }

    private drawViewport() {
        this.p5.stroke('red');
        this.p5.fill(0, 0, 0, 0);
        this.p5.rect(50, 50, this.viewport.x, this.viewport.y);
    }

    private drawMap() {


        this.p5.stroke('#E5E3E4');
        this.p5.fill('white');

        const hexOffset = this.layout.hexCornerOffset(0);
        // ile zmiesci sie na X
        const maxX = (this.viewport.x / hexOffset.x) / 2;
        // ile zmiesci sie na Y
        const maxY = (this.viewport.y / hexOffset.y) / 3;

        const left = 0;
        const top = 0;

        // console.log(maxX, maxY);

        for (let r = top; r <= maxY; r++) { // pointy top
            const r_offset = this.p5.floor(r / 2.0);
            for (let q = left - r_offset; q <= maxX - r_offset; q++) {
                this.p5.print('Stary kod - nie przepisane');

                debugger;
                // this.drawHexagon2(this.p5, new Hex(q, r, -q - r));
            }
        }
    }

    private drawHexagon2(convas: p5, mapHex: MapHex) {
        convas.strokeWeight(this.hexDrawSize / 7); // 3
        convas.stroke('white');
        convas.fill(mapHex.color);

        convas.beginShape();
        const points = this.layout.polygonCorners(mapHex);
        for (const point of points) {
            convas.vertex(point.x, point.y);
        }
        convas.endShape(this.p5.CLOSE);
    }
}