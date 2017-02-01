import {Izbor} from "../../../komponente/izbor/Izbor";
import {Kisha} from "../../../priroda/Kisha.js";
import podaci from './podaci.json';
import stil from "./stil.css";

const kisha = new Kisha()

export default class extends Izbor {

  constructor() {
    super(podaci);
    this.stil = stil;
  }

  start() {
    super.start()
    kisha.start()
  }

  stop() {
    super.stop()
    kisha.stop()
  }

}
