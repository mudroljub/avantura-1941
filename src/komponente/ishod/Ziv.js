import {Ishod} from './Ishod';

const akcije = ['Nastavi', 'Dalje', 'Nastavi borbu', 'Hrabro napred']

export class Ziv extends Ishod {

  constructor(podaci) {
    super(podaci);
    this.podaci.akcija = podaci.akcija || akcije[Math.floor(Math.random() * akcije.length)]
  }

}
