import data from './data.json'
import {Editor} from './komponente/editor/Editor'
import {Ishod} from './komponente/ishod/Ishod'
import {Izbor} from './komponente/izbor/Izbor'
import {Izvestaj} from './komponente/izvestaj/Izvestaj'
import {Sudbina} from './komponente/sudbina/Sudbina'
import {Zakletva} from './komponente/zakletva/Zakletva'

const Sabloni = { Ishod, Izbor, Izvestaj, Sudbina, Zakletva }

/**
 * ažurirati logiku za kišu i css
 */
const editor = new Editor()

const prvaScena = praviScenu('1941-05-01-okupacija')
let trenutnaScena = prvaScena
trenutnaScena.start()

/* DOGADJAJI */

document.addEventListener("click", e => {
  const element = e.target
  if (element.classList.contains('js-start')) pustiScenu(element.value)
  if (element.classList.contains('js-reload')) window.location.reload()
})

document.addEventListener("dblclick", e => {
  if (e.target.classList.contains('js-dvoklik-start')) pustiScenu(e.target.value)
})

window.addEventListener('load', rutiraj)
window.addEventListener('hashchange', rutiraj)

/* FUNKCIJE */

function praviScenu(ruta) {
  const scena = data[ruta]
  const Sablon = Sabloni[scena.sablon] || Izbor
  return new Sablon(scena)
}

function pustiScenu(ruta) {
  trenutnaScena.stop()
  if (ruta in data) {
    trenutnaScena = praviScenu(ruta)
  } else if (ruta == 'editor') {
    trenutnaScena = editor
  } else {
    trenutnaScena = prvaScena
  }
  trenutnaScena.start()
  window.location.hash = ruta
  window.scroll(0, 0)
}

function rutiraj() {
  const ruta = window.location.hash.slice(1)
  pustiScenu(ruta)
}
