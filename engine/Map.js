class Map {
    constructor(size) {
        this.size = size;

        this.array2d = Array.from(Array(this.size.x), () => new Array(this.size.y));
        this.list = [];

        // console.log(this.array);
    }

    insert(hex) {
        // debugger;
        this.array2d[hex.q][hex.r] = hex;

        this.list.push(hex);
    }

    getMapHex(hex) {
        let q = ( hex.q % this.size.x );
        let r = ( hex.r % this.size.y );

        if( q < 0 ){
            q = this.size.x + q; // q jest ujemne
        }

        if( r < 0 ){
            r = this.size.y + r;
        }

        return this.array2d[q][r]
    }

    getList() {
        return this.list;
    }
}