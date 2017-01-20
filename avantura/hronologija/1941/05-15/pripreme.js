import {Izbor} from "../../../komponente/izbor/Izbor";
import podaci from './pripreme.json';

export default class extends Izbor {

  constructor() {
    super(podaci);
    this.podaciFajl = 'pripreme.json'
  }

}
