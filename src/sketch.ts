import p5 from "p5";
import {
  setValues,
  isDebugMode,
  // width,
  // height,
  isProduction,
} from "./_globals";
// import { handleKeyPress } from "./_keypress";
import {Point} from "./MapGeometry/Point";
import {MapCreator} from "./MapCreator/MapCreator";
import {MainView} from "./MapDisplay/MainView";


const sketch = (p: p5) => {
  setValues(p);

  let hex_size_R = 30;
  hex_size_R = 10;

  let mainView;

  p.setup = () => {
    const worldSize = new Point(29, 22);
    // let worldSize = new Point(3, 5);
    const mapGenerator = new MapCreator(worldSize, p);
    const worldMap = mapGenerator.generate();


    mainView = new MainView(worldMap, hex_size_R, p);
    mainView.setup();
  };

  p.draw = () => {
    p.background([0, 0, 0, 0]);

    if (isDebugMode && !isProduction) {
      // Render FPS as text
      p.push();
      p.fill(255, 255, 255);
      p.textSize(12);
      p.text(`${p.frameRate().toFixed(2)}fps`, 20, 20);
      p.pop();
    }

    mainView.draw();
  };
};

new p5(sketch);
