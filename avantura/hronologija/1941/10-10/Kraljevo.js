import {Izbor} from "../../../komponente/izbor/Izbor";
import podaci from './podaci.json';

export default class OpsadaKraljeva extends Izbor {
  constructor() {
    super(podaci);
  }
}
