/**
 * https://github.com/scottschiller/snowstorm/
 * Making it snow on the internets since 2003. You're welcome.
 */

const snowColor = '#fff';
const snowCharacter = '&bull;'; // &bull; = bullet, &middot; is square on some systems etc.
const flakeWidth = 8; // Max pixel width reserved for snow element
const flakeHeight = 8; // Max pixel height reserved for snow element
const zIndex = 0; // CSS stacking order applied to each snowflake
const meltFrameCount = 20;
let meltFrames = [];

let screenX = null,
  halfScreenX = null,
  screenY = null,
  scrollY = null,
  docHeight = null,
  vRndX = null,
  vRndY = null,
  windOffset = 1,
  windMultiplier = 2,
  flakeTypes = 6;


class SnowFlake {

  constructor(snowstorm, type) {
    this.snowstorm = snowstorm
    this.type = type;
    this.x = random(screenX - 20);
    this.y = -random(screenY) - 12;
    this.snowStick = true; // Whether or not snow should "stick" at the bottom
    this.useMeltEffect = true; // When recycling fallen snow (or rarely, when falling), have it "melt" and fade out
    this.vX = null;
    this.vY = null;
    this.vAmpTypes = [1, 1.2, 1.4, 1.6, 1.8]; // "amplification" for vX/vY (based on flake size/type)
    this.vAmp = this.vAmpTypes[this.type] || 1;
    this.melting = false;
    this.meltFrame = 0;
    this.active = 1;
    this.fontSize = (10 + (this.type / 5) * 10);
    this.element = document.createElement('div');
    this.element.innerHTML = snowCharacter;
    this.element.style.color = snowColor;
    this.element.style.height = flakeHeight + 'px';
    this.element.style.position = 'absolute';
    this.element.style.width = flakeWidth + 'px';
    this.element.style.zIndex = zIndex;
    document.body.appendChild(this.element);
    this.recycle();
  }

  stick() {
    this.element.style.bottom = '0%';
    this.element.style.position = 'fixed';
    this.element.style.top = 'auto';
  }

  vCheck() {
    if (this.vX >= 0 && this.vX < 0.2) {
      this.vX = 0.2;
    } else if (this.vX < 0 && this.vX > -0.2) {
      this.vX = -0.2;
    }
    if (this.vY >= 0 && this.vY < 0.2) {
      this.vY = 0.2;
    }
  }

  move() {
    let vX = this.vX * windOffset;
    let yDiff;
    this.x += vX;
    this.y += (this.vY * this.vAmp);
    if (this.x >= screenX || screenX - this.x < flakeWidth) { // X-axis scroll check
      this.x = 0;
    } else if (vX < 0 && this.x < -flakeWidth) {
      this.x = screenX - flakeWidth - 1; // flakeWidth;
    }
    this.updatePosition();
    yDiff = screenY + scrollY - this.y + flakeHeight;
    if (yDiff < flakeHeight) {
      this.active = 0;
      if (this.snowStick) {
        this.stick();
      } else {
        this.recycle();
      }
    } else {
      if (this.useMeltEffect && this.active && this.type < 3 && !this.melting && Math.random() > 0.998) {
        // ~1/1000 chance of melting mid-air, with each frame
        this.melting = true;
        this.melt();
      }
    }
  }

  setVelocities() {
    this.vX = vRndX + random(this.snowstorm.vMaxX * 0.12, 0.1);
    this.vY = vRndY + random(this.snowstorm.vMaxY * 0.12, 0.1);
  }

  setOpacity(element, opacity) {
    element.style.opacity = opacity;
  }

  melt() {
    if (this.meltFrame < meltFrameCount) {
      this.element.style.fontSize = this.fontSize - (this.fontSize * (this.meltFrame / meltFrameCount)) + 'px';
      this.element.style.lineHeight = flakeHeight + 2 + (flakeHeight * 0.75 * (this.meltFrame / meltFrameCount)) + 'px';
      this.element.style.opacity = meltFrames[this.meltFrame];
      this.meltFrame++;
    } else {
      this.recycle();
    }
  }

  updatePosition() {
    this.element.style.right = (100 - (this.x / screenX * 100)) + '%';
    this.element.style.bottom = (100 - (this.y / screenY * 100)) + '%';
  }

  recycle() {
    this.setVelocities();
    this.vCheck();
    this.meltFrame = 0;
    this.melting = false;
    this.element.style.bottom = 'auto';
    this.element.style.fontSize = this.fontSize + 'px';
    this.element.style.lineHeight = (flakeHeight + 2) + 'px';
    this.element.style.margin = '0px';
    this.element.style.opacity = 1;
    this.element.style.padding = '0px';
    this.element.style.position = 'absolute';
    this.element.style.textAlign = 'center';
    this.element.style.verticalAlign = 'baseline';
    this.x = random(screenX - flakeWidth - 20);
    this.y = random(screenY) * -1 - flakeHeight;
    this.updatePosition();
    this.active = 1;
  }

}


export default class Snowstorm {

  constructor() {
    this.flakesMax = 128; // total amount of snow made (falling + sticking)
    this.flakesMaxActive = 64; // amount of snow falling at once (less = lower CPU use)
    this.vMaxX = 5; // Maximum X velocity range for snow
    this.vMaxY = 4; // Maximum Y velocity range for snow
    this.followMouse = true;
    this.falling = false;
    this.flakes = [];
    this.setSizes();
  }

  start() {
    for (let i = 0; i < this.flakesMax; i++) {
      this.flakes[this.flakes.length] = new SnowFlake(this, random(flakeTypes));
      if (i < meltFrameCount) meltFrames.push(1 - (i / meltFrameCount));
    }
    this.randomizeWind();
    this.resume();
    this.addListeners()
  }

  stop() {
    for (let i = 0; i < this.flakes.length; i++) {
      this.flakes[i].element.parentNode.removeChild(this.flakes[i].element);
    }
    meltFrames = []
    this.flakes = []
    this.pause();
    this.removeListeners()
  }

  pause() {
    this.falling = false;
  }

  resume() {
    this.falling = true;
    this.update();
  }

  addListeners() {
    window.addEventListener('resize', this.setSizes.bind(this))
    window.addEventListener('scroll', this.scrollHandler.bind(this))
    window.addEventListener('blur', this.pause.bind(this))
    window.addEventListener('focus', this.resume.bind(this))
    this.scrollHandler();
    if (this.followMouse) {
      window.addEventListener('mousemove', this.mouseMove.bind(this))
    }
  }

  removeListeners() {
    window.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.setSizes)
    window.removeEventListener('blur', this.pause)
    window.removeEventListener('focus', this.resume)
    if (this.followMouse) {
      window.removeEventListener('mousemove', this.mouseMove)
    }
  }

  randomizeWind() {
    vRndX = plusMinus(random(this.vMaxX, 0.2));
    vRndY = random(this.vMaxY, 0.2);
    for (let i = 0; i < this.flakes.length; i++) {
      if (this.flakes[i].active) this.flakes[i].setVelocities();
    }
  }

  scrollHandler() {
    scrollY = window.scrollY || 0;
    for (let i = 0; i < this.flakes.length; i++) {
      if (this.flakes[i].active === 0) this.flakes[i].stick();
    }
  }

  setSizes() {
    screenX = window.innerWidth - 16;
    screenY = window.innerHeight;
    docHeight = document.body.offsetHeight;
    halfScreenX = screenX / 2;
  }

  update() {
    if (!this.falling) return;
    let activeFlakes = 0;
    for (let i = 0; i < this.flakes.length; i++) {
      if (this.flakes[i].active === 1) {
        this.flakes[i].move();
        activeFlakes++;
      }
      if (this.flakes[i].melting) this.flakes[i].melt();
    }
    if (activeFlakes < this.flakesMaxActive) {
      let flake = this.flakes[parseInt(random(this.flakes.length))];
      if (flake.active === 0) flake.melting = true;
    }
    window.requestAnimationFrame(this.update.bind(this))
  }

  mouseMove(e) {
    var x = e.clientX;
    if (x < halfScreenX) {
      windOffset = -windMultiplier + (x / halfScreenX * windMultiplier);
    } else {
      x -= halfScreenX;
      windOffset = (x / halfScreenX) * windMultiplier;
    }
  }

}


/* HELPERS */

function random(n, min) {
  if (isNaN(min)) min = 0;
  return (Math.random() * n) + min;
}

function plusMinus(n) {
  return (parseInt(random(2), 10) === 1 ? n * -1 : n);
}
