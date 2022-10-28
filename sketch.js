const p = new p5(function (p) {
    let hex_size_R = 30;
    hex_size_R = 10;

    let mainView;

    p.setup = function () {
        let worldSize = new Point(29, 22);
        // let worldSize = new Point(3, 5);
        let mapGenerator = new MapGenerator(worldSize);
        let worldMap = mapGenerator.generate();

        console.log(worldMap);

        mainView = new MainView(worldMap, hex_size_R);
        mainView.setup();
    }

    p.draw = function () {
        mainView.draw();
    }
});
