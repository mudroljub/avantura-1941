var ukupnoKapi = 40;
var snagaVetra = 2;
var srednjiPomak = 8;
var srednjaVelicinaKapi = 8;
var boje = ["#555555", "#888888", "#666666", "#999999", "#777777", "#aaaaaa"];

var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var pageXOffset = window.pageXOffset;
var pageYOffset = window.pageYOffset;

class Kap {

  constructor(x, y, velicina, boja, pomak, vetar) {
    this.x = x;
    this.y = y;
    this.pomak = pomak;
    this.vetar = vetar;
    this.element = document.createElement('div');
    this.element.style.height = `${velicina}px`;
    this.element.style.background = `${boja}`;
    this.element.style.position = 'absolute';
    this.element.style.width = '1px';
    this.element.style.visibility = 'hidden';
    this.element.style.top = 0;
    this.element.style.left = 0;
  }

  update() {
    this.y += this.pomak;
    this.x += this.vetar;
    this.x = (this.x + innerWidth) % innerWidth; // drzi u granicama ekrana
    this.element.style.left = this.x + pageXOffset + 'px';
    this.element.style.top = this.y + pageYOffset + 'px';
  }

  dodaj() {
    document.body.appendChild(this.element);
  }

  ukloni() {
    document.body.removeChild(this.element);
  }
}


export class Kisha {

  start() {
    this.kapi = [];
    this.vetar = Math.random() < 0.5 ? snagaVetra : -snagaVetra;
    this.brojKapi = ukupnoKapi;
    this.trenutnoKapi = 0;
    this.praviKapi()
    this.interval = window.setInterval(this.update.bind(this), 20);
    document.body.style.overflowY = 'scroll';
    document.body.style.overflowX = 'hidden';
  }

  praviKapi() {
    for (let i = 0; i < this.brojKapi; i++) {
      let kapX = Math.round(Math.random() * innerWidth);
      let kapY = Math.round(Math.random() * innerHeight);
      let velicina = Math.round(Math.random() * srednjaVelicinaKapi) + srednjaVelicinaKapi;
      let boja = boje[i % 6];
      let pomak = Math.round(Math.random() * 8) + srednjiPomak;
      const kap = new Kap(kapX, kapY, velicina, boja, pomak, this.vetar);
      kap.dodaj();
      this.kapi.push(kap);
    }
  }

  update() {
    azurirajOfset();
    if (this.trenutnoKapi < this.brojKapi) this.laganoKreni();
    for (let i = 0; i < this.trenutnoKapi; i++) {
      this.kapi[i].update();
      if (this.kapi[i].y >= innerHeight) this.kapi[i].y = -10;
    }
  }

  laganoKreni(){
    this.trenutnoKapi++;
    this.kapi[this.trenutnoKapi-1].element.style.visibility = 'visible';
  }

  stop() {
    this.brojKapi = 0;
    clearInterval(this.interval);
    this.kapi.map(kap => kap.ukloni())
    document.body.removeAttribute('style');
  }

}


function azurirajOfset() {
  pageXOffset = window.pageXOffset;
  pageYOffset = window.pageYOffset;
}
