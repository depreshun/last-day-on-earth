class Star {
  constructor(options) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    this.x = options.x;
    this.y = options.y;
  }

  reset(w, h) {
    this.size = Math.random() * 2;
    this.speed = Math.random() * 0.05;
    this.x = w;
    this.y = Math.random() * h;
  }

  update(ctx, w, h) {
    this.x -= this.speed;
    if (this.x < 0) {
      this.reset(w, h);
    } else {
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
}

class Sun {
  constructor(options) {
    this.r = options.r;
    this.x = options.x;
    this.y = options.y;
  }

  reset(w, h) {}

  update(ctx, w, h) {
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#f5eb71";
    ctx.fillStyle = "#F6D602";

    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }
}

class Moon {
  constructor(options) {
    this.r = options.r;
    this.x = options.x;
    this.y = options.y;
  }

  reset(w, h) {}

  update(ctx, w, h) {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#f5eb71";
    ctx.fillStyle = "#d3d3e3";

    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.r,
      (Math.PI / 180) * 40,
      (Math.PI / 180) * 320
    );
    ctx.bezierCurveTo(
      this.x - 40,
      this.y - 50,
      this.x - 40,
      this.y + 50,
      this.x + 50,
      this.y + 50
    );
    ctx.fill();
  }
}

function createNightSky(background, bgCtx) {
  var width = window.innerWidth,
    height = document.body.offsetHeight;

  height < 400 ? (height = 400) : height;

  background.width = width;
  background.height = height;

  var entities = [];

  // init the sun
  entities.push(new Sun({ x: width / 2, y: height / 4, r: 75 }));

  // init the stars
//   for (var i = 0; i < height; i++) {
//     entities.push(
//       new Star({
//         x: Math.random() * width,
//         y: Math.random() * height,
//       })
//     );
//   }

  //animate background
  function animate() {
    bgCtx.fillStyle = "white";
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
