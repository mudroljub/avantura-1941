import {Scena} from "../../komponente/Scena"
import sablon from "./sablon.html"

const css = {
  upute: '',
  zakletva: "none"
}

export class Zakletva extends Scena {

  constructor(podaci) {
    super(podaci, sablon)
    this.css = css
  }

  start(){
    super.start()
    document.querySelector("#ime").focus()
    document.querySelector('#pokazi-zakletvu').addEventListener('click', this.pokaziZakletvu.bind(this))
  }

  render() {
    this.element.innerHTML = this.eval(this.eval(this.sablon))   // evaluira dvaput, za sablone unutar sablona
  }

  pokaziZakletvu() {
    this.igrac.ime = document.querySelector("#ime").value
    if (!this.igrac.ime) return
    this.css.zakletva = 'block'
    this.css.upute = 'none'
    this.render()
  }

}
