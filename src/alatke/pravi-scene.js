const os = require('os')
const dir = require('node-dir')
const path = require('path')
const fs = require('fs')
const {
  capitalizeFirst,
  camelCaseToDash
} = require('../utils');

/* LOGIKA */

var slash = os.platform() == 'win32' ? '\\' : '/'
var putanja = `src${slash}hronologija${slash}`
var nazivFajla = `src${slash}generisano${slash}scene.js`

procitajFajlove(function(podaci) {
  var scene = praviScene(podaci)
  upisiFajl(scene)
})

/* FUNKCIJE */

function procitajFajlove(callback) {
  dir.files(putanja, function(err, files) {
    if (err) throw err;
    var jsFajlovi = []
    for (var i = 0; i < files.length; i++) {
      var putFajla = files[i]
      var ekstenzija = path.extname(putFajla)
      if (ekstenzija === ".js") jsFajlovi.push(putFajla)
    }
    jsFajlovi.sort()
    callback(jsFajlovi)
  });
}

function praviScene(jsFajlovi) {
  var importi = ``
  var scene = `export const scene = {`
  var lokacije = `export const lokacije = {`
  for (let i = 0; i < jsFajlovi.length; i++) {
    var putanja = jsFajlovi[i]
    var unixPutanja = putanja.replace(/\\/g, '/')
    var kracaPutanja = putanja.replace(`src${slash}`, '')
    var unixKracaPutanja = kracaPutanja.replace(/\\/g, '/')
    var ekstenzija = path.extname(kracaPutanja)

    var ruta = kracaPutanja.replace(`hronologija${slash}`, '')
    ruta = ruta.replace(ekstenzija, '')
    ruta = ruta.split(slash).join('-')
    ruta = camelCaseToDash(ruta)

    var privremenNazivKlase = kracaPutanja.split(slash).join('-')
    privremenNazivKlase = privremenNazivKlase.replace(/-/g, '_')
    privremenNazivKlase = privremenNazivKlase.replace(ekstenzija, '')
    privremenNazivKlase = capitalizeFirst(privremenNazivKlase)

    importi += `import ${privremenNazivKlase} from '../${unixKracaPutanja}'
`
    scene += `
  '${ruta}': new ${privremenNazivKlase}(),`
    lokacije += `
	'${ruta}': '${unixPutanja}',`

  }
  scene += `
}`
  lokacije += `
}`

  return `
${importi}

// nazivi su rute
${scene}

${lokacije}`
}

function upisiFajl(podaci) {
  fs.writeFile(nazivFajla, podaci, function() {
    console.log('azurirane scene')
  })
}
