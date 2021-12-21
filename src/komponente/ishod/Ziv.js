import {Ishod} from './Ishod';

const akcije = ['Nastavi', 'Dalje', 'Nastavi borbu', 'Hrabro napred']

const slucajnaAkcija = () => akcije[Math.floor(Math.random() * akcije.length)]

export class Ziv extends Ishod {

  constructor(podaci) {
    super(podaci);
    this.podaci.akcija = podaci.akcija || slucajnaAkcija()
  }

}
