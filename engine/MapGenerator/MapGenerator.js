class MapGenerator {
    constructor(size) {
        this.size = size;
    }

    generate() {
        // p.noiseSeed(99);

        // #8dc341

        let worldmap = new Map(this.size);

        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                var mapHex = new MapHex(x, y);

                //

                // let key = Math.ceil(p.map(p.noise(mapHex.q, mapHex.r, mapHex.s), 0, 1, 0, colors.length)) - 1;
                // mapHex.color = colors[key];

                // let noiseVal = p.noise(mapHex.q/10, mapHex.r/10, mapHex.s/10);
                let noiseVal = p.noise(mapHex.q/5, mapHex.r/5 ); //, mapHex.s/10);

                if( noiseVal > 0.4 ){
                    noiseVal = 1;
                }

                mapHex.color = noiseVal == 1 ? '#8dc341' : [0,0,0,0];

                worldmap.insert(mapHex);
            }
        }

        return worldmap;
    }
    generateColor() {
        let colors = [
            '#469597',
            '#5BA199',
            '#BBC6C8',
            '#E5E3E4',
            '#DDBEAA',
        ];

        colors = [
            '#f0cb16',
            '#eb2827',
            '#1d347e',
            '#019ad1',
            '#008d3d',
        ];

        colors = [
            'transparent',
            // '#f2f2f4',
            '#fcd100',
            '#9056a0',
            '#8dc341',
            '#f47120',
            '#eb1e38',
            '#017a68',
            '#009ed8',
        ];

        p.noiseSeed(99);

        let worldmap = new Map(this.size);

        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                var mapHex = new MapHex(x, y);

                //mapHex.color = colors[Math.floor(Math.random() * colors.length)];

                // let key = Math.ceil(p.map(p.noise(mapHex.q, mapHex.r, mapHex.s), 0, 1, 0, colors.length)) - 1;
                // mapHex.color = colors[Math.floor(Math.random() * colors.length)];


                // let noiseVal = p.noise(mapHex.q, mapHex.r, mapHex.s);
                // mapHex.color = noiseVal * 255;

                worldmap.insert(mapHex);
            }
        }

        worldmap.array2d[0][0].color = "#f00";

        return worldmap;
    }
}