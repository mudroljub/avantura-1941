import {Ishod} from './Ishod';
import stil from './stil-mrtav.css';

const akcije = ['Pokušaj ponovo!', 'Pokušaj opet', 'Probaj iznova', 'Okušaj se još jednom']
const ishodi = [
  'Hrabro si pao u borbi protiv okupatora. Tvoje telo će pojesti crvi, ali sećanje na tvoju borbu trajaće večno.',
  'Ubijen si u borbi sa jačim. Tvoje kosti sada raznose zveri, ali tvoja hrabrost nadahnjuje generacije.',
  'Ubijen si od dušmanske ruke. Tvoj grob će ostati neznan, ali tvoji su podvizi proslavljeni pesmom.'
]

export class Mrtav extends Ishod {

  constructor(podaci) {
    super(podaci);
    this.stil = stil;
    this.podaci.naslov = podaci.naslov || 'Mrtav si'
    this.podaci.slika = podaci.slika || 'fotke/smrt/jajinci-doubijanje.jpg'
    this.podaci.opis = podaci.opis || ishodi[Math.floor(Math.random() * ishodi.length)]
    this.podaci.akcija = podaci.akcija || akcije[Math.floor(Math.random() * akcije.length)]
    this.podaci.veza = podaci.veza || ''
  }

}
