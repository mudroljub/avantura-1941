import {Izbor} from "../../../komponente/izbor/Izbor";
import podaci from './podaci.json';

export default class Opkoljen extends Izbor {
  constructor() {
    super(podaci);
  }
}
