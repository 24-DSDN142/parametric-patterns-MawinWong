//your parameter variables go here!
let colors = ["#614338", "#825399"];
let mySeed;
let patterns = [];
let appleImg;

function preload() {
  appleImg = loadImage('https://img.pikbest.com/png-images/20190826/a-bunch-of-bananas-cartoon-japanese-vector_2526839.png!sw800'); // Placeholder image for the apple
}

function setup() {
  createCanvas(1000, 1000);
  ellipseMode(CENTER);
  rectMode(CENTER);
  mySeed = 1234; // Fixed seed for consistency
  let mySize = 200;

  randomSeed(mySeed); // Set the random seed for consistent patterns
  patterns.push(new Pattern(width / 2, height / 2, width - mySize));

  for (let xx = mySize / 2; xx <= width - mySize / 2; xx += mySize) {
    for (let yy = mySize / 2; yy <= height - mySize / 2; yy += mySize) {
      if (random(0, 1) > 0.5) {
        patterns.push(new Pattern(xx, yy, mySize));
      }
    }
  }

  mySize /= 2;

  for (let xx = mySize / 2; xx <= width - mySize / 2; xx += mySize) {
    for (let yy = mySize / 2; yy <= height - mySize / 2; yy += mySize) {
      if (random(0, 1) > 0.25) {
        patterns.push(new Pattern(xx, yy, mySize));
      }
    }
  }

  noLoop();
}

function draw() {
  randomSeed(mySeed);
  background(255); // Set a white background for better visibility

  for (let i = 0; i < patterns.length; i++) {
    patterns[i].draw();
  }

  let mySize = 2;
  randomSeed(mySeed); // Ensure the grid points are consistent
  for (let xx = mySize; xx <= width - mySize; xx += mySize) {
    for (let yy = mySize; yy <= height - mySize; yy += mySize) {
      fill(0);
      noStroke();
      circle(xx, yy, 0.5);
    }
  }
}

class Pattern {
  constructor(x, y, mySize) {
    this.x = x;
    this.y = y;
    this.size = mySize;
    this.color1 = colors[0];
    this.color2 = colors[1];
    randomSeed(mySeed + x + y); // Unique seed for each pattern based on position
    this.angle = random([0, PI / 2, PI, 3 * PI / 2]);
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // Diagonal line triangles
    fill(this.color1);
    triangle(-this.size / 2, -this.size / 2, this.size / 2, -this.size / 2, 0, 0);
    fill(this.color2);
    triangle(-this.size / 2, this.size / 2, this.size / 2, this.size / 2, 0, 0);

    image(appleImg, -this.size / 6, -this.size / 6, this.size / 3, this.size / 3); // Apple image in the center

    pop();
  }
}

function generateColor() {
  randomSeed(mySeed); // Ensure colors are consistent
  return colors[floor(random(0, colors.length))];
}

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(DEVELOP_GLYPH);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); //set this to false when you're ready to print

  //Grid settings
  pWallpaper.grid_settings.cell_width  = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset  = 50;
}

function wallpaper_background() {
  background(240, 255, 240); //light honeydew green colour
}

function my_symbol() { // do not rename this function. Treat this similarly to a Draw function
  rect(40 ,40, rect_width, rect_height);
}
