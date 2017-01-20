import {Scena} from '../Scena';
import sablon from './sablon.html';

const odlaganjeDugmeta = 4000
const css = {
  dugme: 'hidden',
}

export class Ishod extends Scena {

  constructor(podaci) {
    super(podaci, sablon);
    this.css = css;
  }

  start() {
    super.start();
    setTimeout(() => {
      css.dugme = 'visible';
      this.render()
    }, odlaganjeDugmeta);
  }

}
