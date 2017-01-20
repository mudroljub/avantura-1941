import {Sudbina} from "../../../komponente/sudbina/Sudbina"
import podaci from './podaci.json'

export default class Opkoljen extends Sudbina {
  constructor() {
    super(podaci)
  }
}
