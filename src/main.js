import {
  Meni
} from './komponente/meni/Meni'
import {
  scene
} from './generisano/scene'

const meni = new Meni()
let trenutnaScena = meni
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

function pustiScenu(scena) {
  let izabranaScena = scene[scena] || meni
  window.location.hash = scene[scena] ? scena : ''
  trenutnaScena.stop()
  trenutnaScena = izabranaScena
  trenutnaScena.start()
  window.scroll(0, 0)
}

function rutiraj() {
  let ruta = window.location.hash.slice(1)
  pustiScenu(ruta)
}
