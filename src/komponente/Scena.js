import {igrac} from "../igrac"

/*
 @param podaci: JSON object
 @param sablon: HTML template
 @param element: DOM element
*/
export class Scena {

  constructor(podaci, sablon, element) {
    this.podaci = podaci || {}
    this.sablon = sablon;
    this.element = element || document.querySelector('#avantura')
    this.igrac = igrac
    this.podaciFajl = 'podaci.json'
  }

  start() {
    if (this.priroda) this.priroda.start()
    this.render()
    document.title = this.podaci.naslov || document.title
  }

  stop() {
    if (this.priroda) this.priroda.stop()
    this.clear()
  }

  eval(sablon) {
    return eval('`' + sablon + '`')   // convert string to template string
  }

  render (element = this.element, sablon = this.sablon) {
    element.innerHTML = this.eval(sablon)
  }

  dodaj(element = this.element, sablon = this.sablon) {
    element.innerHTML += this.eval(sablon);
  }

  clear () {
    this.element.innerHTML = '';
  }

}
