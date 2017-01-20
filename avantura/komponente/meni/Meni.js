// da linije budu vucljive
// da pratiMisha menja x2 i y2 umesto style.left i style.top
// kada izbor dodirne scenu da preuzme vrednost (zalepi se)

import {
  Scena
} from '../Scena'
import {
  scene,
  lokacije
} from '../../generisano/scene'
import pozicije from './pozicije.json'
import sablon from './sablon.html'
import stil from './stil.css'

const startY = 0
const proredY = 200

export class Meni extends Scena {

  constructor() {
    super({}, sablon)
    this.stil = stil
    this.svgVisina = 0;
    this.praviGraf()
  }

  start() {
    super.start()
    this.azurirajPozicije()
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
                class="js-azurira-izbor js-mrda-x js-mrda-y absolute"
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

  azurirajIzbor(element) {
    let ishod = element.value
    let lokacija = lokacije[element.dataset.scena]
    let index = element.dataset.index
    let fajl = scene[element.dataset.scena].podaciFajl
    var http = new XMLHttpRequest()
    http.onload = () => console.log(http.responseText);
    http.open("POST", "http://localhost:3000/podaci", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(`ishod=${ishod}&lokacija=${lokacija}&index=${index}&fajl=${fajl}`);
  }

  render() {
    this.praviGraf()
    super.render()
  }

  azurirajPozicije() {
    let pozicije = JSON.stringify(this.dajPozicije())
    var http = new XMLHttpRequest()
    http.onload = () => console.log(http.responseText)
    http.open("POST", "http://localhost:3000/pozicije", true)
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    http.send(`pozicije=${pozicije}`)
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
    if (element.classList && element.classList.contains('js-mrda-y')) element.style.top = `${e.pageY - element.clientHeight / 2}px`
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
    document.addEventListener("dblclick", this.obradiDvoklik.bind(this))
  }

  ukloniSlusace() {
    document.removeEventListener("mousedown", this.obradiMishStisnut)
    document.removeEventListener("mouseup", this.obradiMishPushten)
    document.removeEventListener("mouseout", this.obradiMishIzvan)
    document.removeEventListener("mousemove", this.obradiMishMrda)
    document.removeEventListener("click", this.obradiKlik)
    document.removeEventListener("dblclick", this.obradiDvoklik)
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
    if (e.target.id == 'sacuvaj') this.azurirajPozicije()
  }

  obradiDvoklik(e) {
    const element = e.target
    if (element.classList && element.classList.contains('js-azurira-izbor')) this.azurirajIzbor(element)
  }

}
