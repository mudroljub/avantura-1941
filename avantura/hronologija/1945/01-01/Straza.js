import {Izbor} from "../../../komponente/izbor/Izbor"
import podaci from './podaci.json'
import Sneg from '../../../../opste/priroda/Sneg.js'
const sneg = new Sneg()

export default class extends Izbor {

  constructor() {
    super(podaci)
  }

  start(){
    super.start()
    sneg.start()
  }

  stop() {
    super.stop()
    sneg.stop()
  }

}
