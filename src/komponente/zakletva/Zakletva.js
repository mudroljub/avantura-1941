import {Scena} from "../../komponente/Scena"
import sablon from "./sablon.html"

const css = {
  upute: '',
  zakletva: "none"
}

const capitalize = phrase => phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase();

export class Zakletva extends Scena {
  constructor(podaci) {
    super(podaci, sablon)
    this.css = css
  }

  start(){
    super.start()
    document.querySelector("#ime").focus()
    document.querySelector('#pokazi-zakletvu').addEventListener('click', this.pokaziZakletvu.bind(this))
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") this.pokaziZakletvu()
    })
  }

  render() {
    this.podaci.tekst = this.podaci.tekst.replace(/\n/g, "<br />")
    this.element.innerHTML = this.eval(this.eval(this.sablon)) // evaluira dvaput, za sablone unutar sablona
  }

  pokaziZakletvu() {
    this.igrac.ime = capitalize(document.querySelector("#ime").value)
    if (!this.igrac.ime) return
    this.css.zakletva = 'block'
    this.css.upute = 'none'
    this.render()
  }

}
