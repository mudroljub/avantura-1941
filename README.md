# 1941 (avantura)

Ratna igrica zasnovana na istorijskim dokumentima i ljudskim izborima.

## Instalacija

Prvo instaliraj [node.js](https://nodejs.org). Nakon toga kloniraj repo i instaliraj zavisnosti:
```
git clone
npm install
```

## Razvoj

Da pokreneš igru u razvojnom modu ukucaj:
```
npm start
```
Browser će se automatski osvežavati svaki put kada sačuvaš izmenu.

## Dokumentacija

### Scena.js

Osnovna klasa je `Scena.js`. Od nje se instanciraju sve konkretne scene. Scena prima tri argumenta (sablon, podaci i element), od kojih je samo prvi obavezan.

Ukoliko DOM element nije eksplicitno prosleđen, scena će pokušati da selektuje element `#avantura`.

### Šablon (HTML)

Svaka scena mora uključiti `sablon.html`, odnosno prikaz scene. Šablon može sadržati zakucane podatke, ili varijable u JS `string literal` sintaksi. Šablon se učitava na početku fajla, i prosleđuje kao jedini obavezni argument sceni:

```js
import sablon from './sablon.html';
const scena = new Scena(sablon)
```
Prilikom renderovanja scene, šablon se evaluira.

### Podaci (JSON)

Ako se u šablonu nalaze varijable, scena mora uključiti `podaci.json`. Nužno je da se nazivi promenljivih u json-u i šablonu poklapaju. Podaci se učitavaju na početku fajla, i prosleđuju kao drugi argument sceni:

```js
import podaci from './podaci.json';
const scena = new Scena(sablon, podaci)
```

Prilikom inicijalizacije, podaci se kače na scenu na sledeći način:
```js
this.podaci = podaci
```

U šablonu se svim podacima pristupa preko `this`:
```js
 ${this.podaci.naslov}
```
gde `this` referira trenutnu scenu.

### Stil (CSS)

Scena opciono može uključiti i `stil.css` fajl, koji je jedinstven za tu scenu:
```js
import stil from './stil.css';
```

Učitani stil se kači na scenu prilikom instanciranja:
```js
this.stil = stil
```

Stil se renderuje u html šablonu unutar `style` taga, na sledeći način:
```html
<style>
  ${this.stil}
</style>
```

## Uraditi:
- srediti level editor
- unositi sadržaj
