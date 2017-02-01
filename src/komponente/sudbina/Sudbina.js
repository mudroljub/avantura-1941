import {Scena} from "../Scena"
import {Ziv} from "../ishod/Ziv"
import {Mrtav} from "../ishod/Mrtav"
import sablon from "./sablon.html"

/*
klasa Sudbina, za scene gde ishod zavisi od kockica
@param podaci: json koji mapira sudbina/sablon.html
@param ishodi: json koji mapira ishod/sablon.html, druga opcija je uvek smrt
*/
export class Sudbina extends Scena {

  constructor(podaci) {
    super(podaci, sablon)
    this.ishodi = this.praviIshodneScene(podaci.ishodi)
  }

  start() {
    super.start()
    document.querySelector('#kockice').addEventListener('click', this.prikaziIshod.bind(this))
  }

  praviIshodneScene(ishodi){
    let ishodneScene = []
    for (let i = 0; i < ishodi.length; i++) {
      ishodi[i].slika = ishodi[i].slika || this.podaci.slika
      let ishodnaScena = ishodi[i].mrtav ? new Mrtav(ishodi[i]) : new Ziv(ishodi[i])
      ishodneScene.push(ishodnaScena)
    }
    return ishodneScene
  }

  prikaziIshod() {
    let random = Math.floor(Math.random() * this.ishodi.length);
    this.ishodi[random].start()
  }

}
