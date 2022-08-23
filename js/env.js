// stars
class Star {
  constructor(options) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    this.x = options.x;
    this.y = options.y;
  }

  reset(width, height) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    this.x = width;
    this.y = Math.random() * height;
  }

  update(bgCtx, width, height) {
    this.x -= this.speed;
    if (this.x < 0) {
      this.reset(width);
    } else {
      bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
}

function createNightSky(background, bgCtx) {
  var width = window.innerWidth,
    height = document.body.offsetHeight;

  height < 400 ? (height = 400) : height;

  background.width = width;
  background.height = height;
  bgCtx.fillStyle = "#05004c";

  var entities = [];

  // init the stars
  for (var i = 0; i < height; i++) {
    entities.push(
      new Star({
        x: Math.random() * width,
        y: Math.random() * height,
      })
    );
  }

  //animate background
  function animate() {
    bgCtx.fillStyle = "#110E19";
    bgCtx.fillRect(0, 0, width, height);
    bgCtx.fillStyle = "#ffffff";
    bgCtx.strokeStyle = "#ffffff";

    var entLen = entities.length;

    while (entLen--) {
      entities[entLen].update(bgCtx, width, height);
    }
    requestAnimationFrame(animate);
  }
  animate();
}
