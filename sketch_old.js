let s = 9;
let map_x = s;
let map_y = s;

let hex_size_R = 30;

let layout;

function setup() {
    let map_size_x = (hex_size_R * 2) * map_x;
    let map_size_y = (hex_size_R * 2) * map_y;
    map_size_x *= 1.5;

    // map_size_x = 300;
    // map_size_y = 300;

    createCanvas(map_size_x, map_size_y);
    frameRate(30);

    let layout = new Layout(
        Layout.pointy,
        new Point(10, 10),
        new Point(0, 0),
    );

    console.log(layout.hexToPixel(new Hex(1, 0)));

}

function draw() {
    background(220);


    stroke('#E5E3E4');

    console.log('a');
    for (let x = 0; x < map_x; x++) {
        for (let y = 0; y < map_y; y++) {
            drawHexagon(x, y);
            // drawTriangle(x, y);

        }
    }

    noLoop();

}

function drawTriangle(x, y) {
    let hexSize = 1.75 * hex_size_R;
    let xx = (x + y / 2) * (hexSize);
    let yy = (sqrt(3) / 2 * y) * (hexSize);

    xx += 50 + 0;
    yy += 50 + hex_size_R;

    stroke('#E5E3E4');
    beginShape()
    for (let a = TAU / 12; a < TAU + TAU / 12; a += TAU / 3) {
        vertex(xx + (hex_size_R * cos(a)), yy + (hex_size_R * sin(a)))
    }
    endShape(CLOSE);

}

function drawHexagon(x, y) {
    // let hexSize = 2 * hex_size_R;
    let hexSize = 1.75 * hex_size_R;

    // fill(0, 102, 153);

    // text('1', 0, 0);
    // fill(0, 102, 153);


    // stroke(255);
    // strokeWeight(5);
    // fill('rgba(255, 255, 100, .25)');

    push();


    // odsuwam od krawedzi
    translate(50, 50);

    // pozycja na "siadce"
    translate(
        (x + y / 2) * (hexSize),
        (sqrt(3) / 2 * y) * (hexSize)
    );


    beginShape();
    for (let a = TAU / 12; a < TAU + TAU / 12; a += TAU / 6) {
        vertex(hex_size_R * cos(a), hex_size_R * sin(a));
    }
    endShape(CLOSE);


    // ellipse(0, 0, hexSize);


    stroke('#BBC6C8');
    textSize(12);
    textAlign(CENTER, CENTER);

    text('[' + (x - 4) + ',' + (y - 4) + ']', 0, 0);


    pop();

}