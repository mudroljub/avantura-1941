import {Sudbina} from "../../../komponente/sudbina/Sudbina";
import podaci from './podaci.json'

export default class Sabac extends Sudbina {
  constructor() {
    super(podaci);
  }
}
