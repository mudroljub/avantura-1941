import {Izvestaj} from "../../../komponente/izvestaj/Izvestaj";
import podaci from './podaci.json';

export default class NemackiIzvestaj extends Izvestaj {

  constructor() {
    super(podaci);
  }

}
