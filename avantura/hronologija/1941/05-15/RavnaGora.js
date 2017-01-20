import {Izbor} from "../../../komponente/izbor/Izbor";
import podaci from './ravna-gora.json';

export default class extends Izbor {

  constructor() {
    super(podaci);
    this.podaciFajl = 'ravna-gora.json'
  }

}
