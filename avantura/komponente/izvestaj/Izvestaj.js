import {Scena} from "../Scena";
import sablon from "./sablon.html";
import stil from "./stil.css";
import pozadinaSrc from './pozadina.jpg';

var brojacTeksta = 0;
var brojacPotpisa = 0;
var kuckanjeInterval;

export class Izvestaj extends Scena {

  constructor(podaci) {
    super(podaci, sablon);
    this.stil = stil;
    this.zvuk = new Audio(__dirname + 'zvuci/kuckanje.mp3');
  }

  start() {
    super.start();
    this.elementTekst = document.querySelector('#tekst')
    this.elementPotpis = document.querySelector('#potpis')
    this.privremenaSlika = new Image();   // backgroundImage nema onload
    this.privremenaSlika.onload = () => {
      document.querySelector('#izvestaj-pozadina').style.backgroundImage = `url(${pozadinaSrc})`;
      kuckanjeInterval = window.setInterval(this.kucaj.bind(this), 80);
      this.zvuk.play();
      delete this.privremenaSlika;
    };
    this.privremenaSlika.src = pozadinaSrc ;
  }

  kucaj() {
    this.elementTekst.innerHTML += this.podaci.tekst.charAt(brojacTeksta);
    brojacTeksta++;
    if (brojacTeksta > this.podaci.tekst.length) {
      this.elementPotpis.innerHTML += this.podaci.potpis.charAt(brojacPotpisa);
      brojacPotpisa++;
    }
    if (brojacPotpisa >= this.podaci.potpis.length) {
      this.zvuk.pause();
      clearInterval(kuckanjeInterval);
    }
  }

  stop() {
    super.stop();
    brojacTeksta = 0;
    brojacPotpisa = 0;
  }

}
