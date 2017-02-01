import {Scena} from '../Scena'
import sablon from './sablon.html'

export class Izbor extends Scena {

  constructor(podaci) {
    super(podaci, sablon)
    this.izbori = praviDugmice(podaci.izbori)
  }

}

function praviDugmice(izbori) {
  let dugmici = ``
  for (let n in izbori) {
    dugmici += `<button value="${izbori[n].link}" class="js-start">${izbori[n].opis}</button>`
  }
  return dugmici
}
