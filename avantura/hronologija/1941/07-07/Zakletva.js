import {Zakletva} from "../../../komponente/zakletva/Zakletva"
import podaci from "./podaci.json"

export default class PartizanskaZakletva extends Zakletva {

  constructor() {
    super(podaci)
  }

}
