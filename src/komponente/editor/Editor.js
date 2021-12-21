/**
 * Belo su izbori nepovezani sa scenom
 */
import { Scena } from '../Scena'
import { scene } from '../../generisano/scene'
import pozicije from './pozicije.json'
import sablon from './sablon.html'
import stil from './stil.css'

const startY = 0
const proredY = 200

export class Editor extends Scena {

  constructor() {
    super({}, sablon)
    this.stil = stil
    this.svgVisina = 0;
    this.praviGraf()
  }

  start() {
    super.start()
    this.sacuvajPozicije()
    this.dodajSlusace()
  }

  stop() {
    super.stop()
    this.ukloniSlusace()
  }

  praviGraf() {
    this.datumi = ``
    this.scene = ``
    this.putanje = ``
    let y = startY
    let prethodniDatum = null
    let prethodnaGodina = null
    let polaSirineDugmeta = 150 // zakucano, dugme jos nije renderovano
    let polaVisineDugmeta = 44
    let polaSirineInputa = 118
    let polaVisineInputa = 22

    console.log(scene);
    for (let scena in scene) {
      let x = pozicije[scena] && pozicije[scena].x || window.innerWidth / 2 - polaSirineDugmeta
      let godina = scena.substring(0, 4)
      let datum = scena.substring(0, 10)
      if (prethodniDatum && datum != prethodniDatum) y += proredY // pravi novi red samo za novi datum

      if (godina != prethodnaGodina) {
        this.datumi += `<h1 class="datum absolute" style="top:${y}px;">${godina}</h1>`
        y += 100
      }

      if (datum != prethodniDatum) {
        this.datumi += `<strong class="datum absolute" style="top:${y}px;">${datum}</strong>`
      }

      this.scene += `
        <button value="${scena}" class="dugme-scena js-mrda-x js-dvoklik-start absolute"
        style="top:${y}px; left:${x}px;" contenteditable="true">
          ${scene[scena].podaci.naslov}<br>
          ${scena}
        </button>`

      if (scene[scena].podaci.izbori) {
        let izbori = scene[scena].podaci.izbori
        for (var i = 0; i < izbori.length; i++) {
          this.putanje += `
            <line
              x1="${x + polaSirineDugmeta}"
              y1="${y + polaVisineDugmeta}" `
            // ako ima pozicija scene, povezuje putanjom, ako nema pravi input
          if (pozicije[izbori[i].link]) {
            let ishodX = pozicije[izbori[i].link].x
            let ishodY = pozicije[izbori[i].link].y
            this.putanje += `
              x2="${ishodX + polaSirineDugmeta}"
              y2="${ishodY+ polaVisineDugmeta}" />`
          } else {
            let inputX = x + i * 300 - polaSirineDugmeta
            let inputY = y + 130
            this.scene += `
              <input
                class="js-mrda-x absolute"
                style="top:${inputY}px; left:${inputX}px;"
                value="${izbori[i].link}"
                data-scena="${scena}" data-index="${i}" />
              <small
                class="absolute"
                style="top:${inputY}px; left:${inputX}px;">
                ${izbori[i].opis}
              </small>
            `
            this.putanje += `
              x2="${inputX + polaSirineInputa}"
              y2="${inputY + polaVisineInputa}" />`
          }

        }
      }
      this.svgVisina = y > this.svgVisina ? y : this.svgVisina

      prethodnaGodina = godina
      prethodniDatum = datum
    }
  }

  azurirajPolozaj(e) {
    const element = e.target
    if (!pozicije[element.value]) return
    if (pozicije[element.value].x == parseInt(element.style.left)) return
    pozicije[element.value].x = parseInt(element.style.left)
    this.render()
  }

  render() {
    this.praviGraf()
    super.render()
  }

  sacuvajPozicije() {
    const pozicije = JSON.stringify(this.dajPozicije())
    console.log(pozicije);
  }

  dajPozicije() {
    var scene = document.querySelectorAll('.dugme-scena')
    var pozicije = {}
    for (var i = 0; i < scene.length; i++) {
      let dugme = scene[i]
      pozicije[dugme.value] = {}
      pozicije[dugme.value].x = parseInt(dugme.style.left)
      pozicije[dugme.value].y = parseInt(dugme.style.top)
    }
    return pozicije
  }

  pocniVucenje(e) {
    e.target.draggable = true
  }

  pratiMisha(e) {
    const element = e.target
    if (element.classList && element.classList.contains('js-mrda-x')) element.style.left = `${e.pageX - element.clientWidth / 2}px`
  }

  zavrsiVucenje(e) {
    e.target.draggable = false
    this.azurirajPolozaj(e)
  }

  /*** DOGADJAJI ***/

  dodajSlusace() {
    document.addEventListener("mousedown", this.obradiMishStisnut.bind(this))
    document.addEventListener("mouseup", this.obradiMishPushten.bind(this))
    document.addEventListener("mouseout", this.obradiMishIzvan.bind(this))
    document.addEventListener("mousemove", this.obradiMishMrda.bind(this))
    document.addEventListener("click", this.obradiKlik.bind(this))
  }

  ukloniSlusace() {
    document.removeEventListener("mousedown", this.obradiMishStisnut)
    document.removeEventListener("mouseup", this.obradiMishPushten)
    document.removeEventListener("mouseout", this.obradiMishIzvan)
    document.removeEventListener("mousemove", this.obradiMishMrda)
    document.removeEventListener("click", this.obradiKlik)
  }

  obradiMishStisnut(e) {
    if (e.target.classList.contains('js-mrda-x')) this.pocniVucenje(e)
  }

  obradiMishPushten(e) {
    if (e.target.classList.contains('js-mrda-x')) this.zavrsiVucenje(e)
  }

  obradiMishIzvan(e) {
    if (e.target.classList.contains('js-mrda-x')) this.zavrsiVucenje(e)
  }

  obradiMishMrda(e) {
    if (e.target.draggable) this.pratiMisha(e)
  }

  obradiKlik(e) {
    if (e.target.id == 'sacuvaj') this.sacuvajPozicije()
  }

}
