import {Editor} from './komponente/editor/Editor'
import {scene} from './generisano/scene'

const editor = new Editor()
const prvaScena = scene['1941-05-01-okupacija']
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

function pustiScenu(ruta) {
  trenutnaScena.stop()
  if (ruta in scene) {
    trenutnaScena = scene[ruta]
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
